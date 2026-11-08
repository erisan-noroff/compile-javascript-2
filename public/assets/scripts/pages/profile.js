import { getStoredName, isAuthenticated, isCurrentUser, redirectToSignUp } from '../utils/authentication.js';
import { LoadingSpinner, loadingTimeout, removeLoadingSpinner } from '../components/loading-spinner.js';
import { ToastNotification } from '../components/toast-notification.js';
import { apiClient } from '../api/api-client.js';
import { Button, setButtonLoading } from '../components/buttons.js';
import PaginationControls from '../components/pagination-controls.js';
import { renderPosts, renderResponse, updateFeed } from '../utils/feed.js';
import BackToHomeLink from '../components/back-to-home-link.js';

async function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }

    const main = document.querySelector('main');
    const homePageLink = BackToHomeLink();
    main.append(homePageLink);

    const feed = document.createElement('div');
    feed.className = 'feed';
    main.append(feed);

    const loadingSpinner = LoadingSpinner();
    feed.append(loadingSpinner);

    try {
        await loadingTimeout();

        const name = getProfileName();
        const profileInformation = await getProfile(name);
        const isOwnProfile = isCurrentUser(profileInformation.data.name);
        const onClick = isOwnProfile
            ? () => location.assign('create-post.html')
            : (e) => toggleFollow(e.currentTarget, profileInformation.data.name);
        const profileCard = ProfileCard(profileInformation.data, {isOwnProfile, onClick});
        feed.replaceChildren(profileCard);

        const response = await getPosts(name, 1);
        const feedList = document.createElement('ul');
        feedList.className = 'feed__list';
        feed.append(feedList);
        renderPosts(response.data);

        const paginationControls = PaginationControls(response.meta, pageChangeHandler);
        feed.append(paginationControls);
    } catch (ex) {
        ToastNotification.error('Loading profile failed', ex.message);
    } finally {
        removeLoadingSpinner();
    }
}

function ProfileCard(profileInformation, {isOwnProfile = false, onClick}) {
    const card = document.createElement('div');
    card.className = 'card profile-card';

    const banner = document.createElement('img');
    card.append(banner);
    banner.className = 'profile-card__banner';
    banner.src = profileInformation.banner.url;
    banner.alt = '';

    const content = document.createElement('div');
    card.append(content);
    content.className = 'profile-card__content';

    const avatar = document.createElement('img');
    content.append(avatar);
    avatar.className = 'profile-card__avatar';
    avatar.src = profileInformation.avatar.url;
    avatar.alt = '';

    const details = document.createElement('div');
    content.append(details);
    details.className = 'profile-card__details';

    const name = document.createElement('h1');
    details.append(name);
    name.textContent = profileInformation.name;

    const bio = document.createElement('p');
    details.append(bio);
    bio.className = 'profile-card__bio';
    bio.textContent = profileInformation.bio ? profileInformation.bio : 'No bio added';

    const stats = document.createElement('div');
    details.append(stats);
    stats.className = 'profile-card__stats';

    const postsCount = document.createElement('p');
    stats.append(postsCount);
    postsCount.textContent = `${profileInformation._count.posts} posts`;

    const followersCount = document.createElement('p');
    stats.append(followersCount);
    followersCount.textContent = `${profileInformation._count.followers} followers`;

    const followingCount = document.createElement('p');
    stats.append(followingCount);
    followingCount.textContent = `${profileInformation._count.following} following`;

    let actionButton;
    if (isOwnProfile) {
        actionButton = Button('Create Post', 'button button--primary profile-card__action');
        content.append(actionButton);
    } else {
        const isFollowing = profileInformation.followers.some(follower => isCurrentUser(follower.name));
        actionButton = Button(isFollowing ? 'Unfollow' : 'Follow', 'button button--secondary profile-card__action');
        actionButton.dataset.isFollowing = isFollowing.toString();
        content.append(actionButton);
    }

    actionButton.addEventListener('click', onClick);

    return card;
}

async function getProfile(name) {
    if (!name)
        throw new Error('Cannot find a matching profile.');

    const api = apiClient();
    const params = new URLSearchParams({_followers: 'true'});
    return await api.get(`/social/profiles/${name}?${params}`);
}

async function toggleFollow(button, name) {
    const isFollowing = button.dataset.isFollowing === 'true';
    setButtonLoading(button, true);

    try {
        await loadingTimeout();
        const response = isFollowing ? await unfollowUser(name) : await followUser(name);
        const isNowFollowing = !isFollowing;
        button.dataset.isFollowing = isNowFollowing.toString();
        button.textContent = isNowFollowing ? 'Unfollow' : 'Follow';
        return response;
    } catch (ex) {
        ToastNotification.error('Toggling following state failed', ex.message);
    } finally {
        setButtonLoading(button, false);
    }
}

async function followUser(name) {
    const api = apiClient();
    return await api.put(`/social/profiles/${name}/follow`);
}

async function unfollowUser(name) {
    const api = apiClient();
    return await api.put(`/social/profiles/${name}/unfollow`);
}

async function getPosts(name, page = 1) {
    const api = apiClient();
    const params = new URLSearchParams({_author: 'true', limit: '25', page: page.toString()});

    return await api.get(`/social/profiles/${name}/posts?${params}`);
}

function getProfileName() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name') || getStoredName();
}

async function pageChangeHandler(pageNumber) {
    try {
        updateFeed(LoadingSpinner());
        await loadingTimeout();
        const response = await getPosts(getProfileName(), pageNumber);
        renderResponse(response, pageChangeHandler);
    } catch (ex) {
        ToastNotification.error('Loading page failed', ex.message);
    } finally {
        removeLoadingSpinner();
    }
}

await init();
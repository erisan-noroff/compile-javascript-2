import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';
import { LoadingSpinner, loadingTimeout, removeLoadingSpinner } from '../components/loading-spinner.js';
import { ToastNotification } from '../components/toast-notification.js';
import { apiClient } from '../api/api-client.js';
import { Button } from '../components/buttons.js';
import PaginationControls from '../components/pagination-controls.js';
import { renderPosts, renderResponse, updateFeed } from '../utils/feed.js';

async function init() {
    if (!isAuthenticated()) {
        redirectToSignUp();
        return;
    }

    const main = document.querySelector('main');
    const homePageLink = document.createElement('a');
    main.append(homePageLink);
    homePageLink.textContent = 'Back to the feed';
    homePageLink.href = 'index.html';

    const feed = document.createElement('div');
    feed.className = 'feed';
    main.append(feed);

    const loadingSpinner = LoadingSpinner();
    feed.append(loadingSpinner);

    try {
        await loadingTimeout();

        const name = getProfileName();
        const profileInformation = await getProfile(name);
        const ownProfile = profileInformation.data.name === localStorage.getItem('name');
        const onClick = ownProfile
            ? () => location.assign('/post/create.html')
            : (e) => toggleFollow(e.currentTarget, profileInformation.data.name);
        const profileCard = ProfileCard(profileInformation.data, {ownProfile, onClick});
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

function ProfileCard(profileInformation, {ownProfile = false, onClick}) {
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

    let actionBtn;
    if (ownProfile) {
        actionBtn = Button('Create Post', 'btn primary-btn profile-card__action', 'create-post');
        content.append(actionBtn);
    } else {
        const followingState = profileInformation.followers.some(
            follower => follower.name === localStorage.getItem('name'));
        actionBtn = Button(followingState ? 'Unfollow' : 'Follow', 'btn secondary-btn profile-card__action', 'toggle-follow');
        actionBtn.dataset.isFollowing = followingState.toString();
        content.append(actionBtn);
    }

    actionBtn.addEventListener('click', onClick);

    return card;
}

async function getProfile(name) {
    if (!name)
        throw new Error('Cannot find a matching profile.');

    const api = apiClient();
    const params = new URLSearchParams({_followers: 'true'});
    return await api.get(`/social/profiles/${name}?${params}`);
}

async function toggleFollow(btn, name) {
    const isFollowing = btn.dataset.isFollowing === 'true';
    btn.disabled = true;
    btn.classList.add('btn--loading');

    try {
        await loadingTimeout();
        const response = isFollowing ? await unfollowUser(name) : await followUser(name);
        btn.dataset.isFollowing = (!isFollowing).toString();
        const isNowFollowing = !isFollowing;
        btn.dataset.isFollowing = isNowFollowing.toString();
        btn.textContent = isNowFollowing ? 'Unfollow' : 'Follow';
        return response;
    } catch (ex) {
        ToastNotification.error('Toggling following state failed', ex.message);
    } finally {
        btn.disabled = false;
        btn.classList.remove('btn--loading');
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
    return params.get('name') ?? localStorage.getItem('name');
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
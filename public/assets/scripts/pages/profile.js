import { isAuthenticated, redirectToSignUp } from '../utils/authentication.js';
import { LoadingSpinner, loadingTimeout, removeLoadingSpinner } from '../components/loading-spinner.js';
import { ToastNotification } from '../components/toast-notification.js';
import { apiClient } from '../api/api-client.js';
import { Button } from '../components/buttons.js';

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

    const profile = document.createElement('div');
    profile.className = 'feed';
    main.append(profile);

    const loadingSpinner = LoadingSpinner();
    profile.append(loadingSpinner);

    try {
        await loadingTimeout();

        const params = new URLSearchParams(window.location.search);
        const name = params.get('name') ?? localStorage.getItem('name');
        const profileInformation = await getProfile(name);
        const ownProfile = profileInformation.data.name === localStorage.getItem('name');
        const profileCard = ProfileCard(profileInformation.data, {
            ownProfile, onClick: ownProfile
                ? () => location.assign('/post/create.html')
                : (e) => toggleFollow(e.currentTarget, profileInformation.data.name)
        });
        profile.replaceChildren(profileCard);
    } catch (ex) {
        ToastNotification.error('Loading post failed', ex.message);
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
    followersCount.textContent = `${profileInformation._count.posts} followers`;

    const followingCount = document.createElement('p');
    stats.append(followingCount);
    followingCount.textContent = `${profileInformation._count.posts} following`;

    let actionBtn;
    if (ownProfile) {
        actionBtn = Button('Create Post', 'btn primary-btn profile-card__action', 'create-post');
        content.append(actionBtn);
    } else {
        const followingState = profileInformation.followers.some(follower => follower.name === localStorage.getItem('name'));
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

await init();
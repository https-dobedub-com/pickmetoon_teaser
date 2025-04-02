import HomeIcon from "src/icons/HomeIcon.vue";
import PopularIcon from "src/icons/PopularIcon.vue";
import NewIcon from "src/icons/NewIcon.vue";
import LibraryIcon from "src/icons/LibraryIcon.vue";

const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '홈',
                    icon: HomeIcon,
                }
            },
            {
                path: 'popular',
                name: 'popular',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '인기',
                    icon: PopularIcon
                }
            },
            {
                path: 'new',
                name: 'new',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '신작',
                    icon: NewIcon,
                }
            },
            {
                path: 'library',
                name: 'library',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '내서재',
                    icon: LibraryIcon,
                }
            },
        ]
    },
    {   path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'company',
                name: 'company',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '회사소개',
                }
            },
            {
                path: 'business',
                name: 'business',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '사업자정보확인',
                }
            },
            {
                path: 'terms',
                name: 'terms',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '이용약관',
                }
            },
            {
                path: 'youth',
                name: 'youth',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '청소년보호정책',
                }
            },
            {
                path: 'customer',
                name: 'customer',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '고객지원',
                }
            },
            {
                path: 'notice',
                name: 'notice',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '공지사항',
                }
            },
            {
                path: 'contact',
                name: 'contact',
                component: () => import('pages/IndexPage.vue'),
                meta: {
                    title: '연재문의',
                }
            },
        ]
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]

export default routes

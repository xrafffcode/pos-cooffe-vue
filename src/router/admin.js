const adminRoutes = [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/admin/index.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/tambah-makanan',
        name: 'add-food',
        component: () => import('@/views/admin/add-food.vue'),
        meta: {
            requiresAuth: true
        }
    },
   
    {
        path: '/admin/edit-makanan/:id',
        name: 'edit-makanan',
        component: () => import('@/views/admin/edit-food.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin/transaksi',
        name: 'transaksi',
        component: () => import('@/views/admin/transaksi.vue'),
        meta: {
            requiresAuth: true
        }
    },
]

export default adminRoutes
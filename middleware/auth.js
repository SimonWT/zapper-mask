const notAuthRoutes = [
    '/admin/login',
    '/ar/'
]

export default function ({ store, redirect, route }) {
    if(!store.getters.isLoggedIn && !notAuthRoutes.some( el => route.path.includes(el))){
        console.log('auth',store.getters.isLoggedIn)
        return redirect('/admin/login')
    }
  }
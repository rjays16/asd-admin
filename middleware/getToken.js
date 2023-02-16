import cookies from 'js-cookie';

export default function ({ store, redirect }) {
    const token = cookies.get('asd-admin-x-access-token');
    if(token) {
        store
        .dispatch('auth/check', {token})
        .catch(errors => {
            store.dispatch('auth/removeToken');
            setTimeout(() => {
                redirect('/');
            }, 2000);
        });
    } else {
        store.dispatch('auth/removeToken');        
    }
}
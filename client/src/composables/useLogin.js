import {ref, toRefs} from 'vue';
import {useAuth} from 'stores/auth';
import {useQuasar} from 'quasar';
import {useRouter} from 'vue-router';

export default function () {

  const $q = useQuasar();
  const $router = useRouter();


  let open = ref(false);
  let newAuthResult = ref(undefined);

  const auth = useAuth();

  async function onLogin({user, redirect='/todos', action='Login'}={}) {
    try {
      newAuthResult .value = await auth.authenticate({
        strategy: 'local',
        email: user.email,
        password: user.password,
      });

      await $router.push(redirect);
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: `${action} successful`
      })
      open.value = false;
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: e.message,
      });
    }
  }

  async function onLogout() {
    try {
      if (localStorage.getItem('feathers-jwt')) {
        localStorage.removeItem('feathers-jwt');
        window.location.replace('/');
        $q.notify({
          type: 'positive',
          message: 'Successfully Logged Out.',
        });
      }
    } catch (e) {
      $q.notify({
        type: 'negative',
        message: e.message,
      });
    }
  }

  const {payload, isAuthenticated, authenticate} = toRefs(auth);
  return {
    open,
    onLogin,
    onLogout,
    authUser: payload,
    isAuthenticated,
    authenticate,
    newAuthResult
  };

}

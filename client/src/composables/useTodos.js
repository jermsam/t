import {computed, reactive, ref, toRefs} from 'vue';
// import {useAuth} from 'stores/auth';
import {useQuasar} from 'quasar';
import {useRouter} from 'vue-router';
import {useFind, usePagination} from 'feathers-pinia';

export default function ({
                           $limit= 5,
                           $skip= 0 ,
                           model,
                           customParams ={},
                           fetchParams={}}={},
                         local,
                         immediate,
                         qid,
) {

  const $q = useQuasar();
  const $router = useRouter();


  let open = ref(false);

  const pagination = reactive({ $limit: $limit, $skip: $skip })

  const params = computed(() => {
    return {
      query: {
        ...pagination
      },
      paginate: true,
      ...customParams
    }
  })

  const { items, latestQuery } = useFind({
    model: model,
    params,
    fetchParams,
    qid,
    local,
    immediate
  })

  const {
    next,
    prev,
    canNext,
    canPrev,
    currentPage,
    itemsCount,
    pageCount,
    toPage,
    toStart,
    toEnd
  } = usePagination(pagination, latestQuery)

  return {
    open,
    items,
    next,
    prev,
    canNext,
    canPrev,
    currentPage,
    itemsCount,
    pageCount,
    toPage,
    toStart,
    toEnd

  };

}

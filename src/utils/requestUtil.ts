export const requestUtil = async (callback: Function, ...params: any) => {
  try {
    return await callback(...params);
  } catch (e) {
    console.log('e.response', e.response);
    return {
      error: e.response.data || e.response,
    };
  }
};

function success<T>(data: T | null = null, msg = 'success', code = 0) {
  return {
    code,
    msg,
    data,
  };
}

function error(msg = 'error', data: any = null, code = 1) {
  return {
    code,
    msg,
    data,
  };
}

export default { success, error };

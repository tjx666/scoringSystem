const p = new Promise((resolve, reject) => {
  reject();
  console(123);
});

p.catch(() => {})
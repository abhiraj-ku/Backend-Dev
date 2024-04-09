const bt = document.getElementById("btn");
bt.addEventListener("click", () => {
  fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 2 },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();

      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location.url = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
});

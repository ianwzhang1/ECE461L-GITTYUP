// please delete this stupid piece of code used for debugging
function alert(message) {
  console.error(message);
}

function addQueryParams(query, dictionary) {
  let internal_query = query;
  let first = true;
  for (const [key, value] of Object.entries(dictionary)) {
    if (first) {
      internal_query += "?";
      first = false;
    } else {
      internal_query += "&";
    }
    internal_query += `${key}=${value}`;
  }
  return internal_query;
}

class BackendLink {
  constructor(url) {
    this.apiURL = url;
    this.session = null;
  }

  // creates a new user and returns an ID if truly new, else none.
  add_user(callbackFx, name, user, pwd) {
    const extension = "user/add";
    const full_url = this.apiURL + extension;
    const requestBody = {
      name: name,
      usr: user,
      pwd: pwd,
    };
    fetch(full_url, {
      method: "post",
      credentials: "include",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Username already exists");
        } else if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((json) => {
        const session = json["session_id"];
        const uid = json["uid"];
        this.session = session;
        callbackFx(uid);
      })
      .catch((error) => {
        alert(error.message);
        callbackFx(null);
      });
  }

  all_hset_ids(callbackFx) {
    const extension = "hset/allids";
    console.log(this.session);
    const full_url = addQueryParams(this.apiURL + extension, {
      session_id: this.session,
    });

    fetch(full_url, {
      credentials: "same-origin",
      method: "get",
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        } else {
          return response.json();
        }
      })
      .then((json) => {
        callbackFx(json);
      })
      .catch((error) => {
        alert(error.message);
        callbackFx(null);
      });
  }
}

function testsignup() {
  const backend = new BackendLink(
    "http://ec2-13-59-237-43.us-east-2.compute.amazonaws.com:5000/"
  );
  backend.add_user(
    (result) => {
      console.log(result);
    },
    // myCallback,
    "bob",
    "vdsfvfwwerwe" + Math.random() * 400,
    "pwd"
  );
}
function testGetHSets() {
  const backend = new BackendLink(
    "http://ec2-13-59-237-43.us-east-2.compute.amazonaws.com:5000/"
  );
  backend.add_user(
    (result) => {
      console.log(result);
      backend.all_hset_ids((result) => {
        console.log(result);
      });
    },
    // myCallback,
    "bob",
    "asdfaeuisfsdafs" + Math.random() * 400,
    "pwd"
  );
}
testGetHSets();

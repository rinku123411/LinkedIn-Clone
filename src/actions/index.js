import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import { SET_USER, SET_LOADING_STATE, GET_ARTICLES } from "./actionsType";

export const setUser = (payload) => ({ //this the set user details of the new user
    type: SET_USER,
    user: payload,
  });

export const setLoading = (status) => ({
    type: SET_LOADING_STATE,
    status: status,
  });

export function signInAPI() {
    return (dispatch) => { // for sigin 
      auth 
        .signInWithPopup(provider) // this function gives the pop up of google 
        .then((payload) => { // we get payload = details of the users - name email etc.
          dispatch(setUser(payload.user)); // dispatching means telling we have a user and we are seting new user through that dispatch
        })
        .catch((error) => alert(error.message));
    };
  }

export function getUserAuth() { // to get the user authentication
    return (dispatch) => { 
      auth.onAuthStateChanged(async (user) => { //on state change of user if user exist 
        if (user) {
          dispatch(setUser(user)); // dospatch the set user
        }
      });
    };
  }

export function signOutAPI() {
    return (dispatch) => {
      auth
        .signOut() // default functions of firebase to logout
        .then(() => {
          dispatch(setUser(null)); // then dispatch and set user to null
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
  }

export function postArticleAPI(payload) { //func. to post. Payload is coming postArticle func.
    return (dispatch) => {
      dispatch(setLoading(true));
  
      if (payload.image != "") { //if the image is not empty then upload it to firebase
        const upload = storage //first put it in a variable upload
          .ref(`images${payload.image.name}`)
          .put(payload.image);
        upload.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
            console.log(`Progress: ${progress}%`);
            if (snapshot.state === "RUNNING") { //method to get the progess bar and time
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downLoadURL = await upload.snapshot.ref.getDownloadURL(); //getting the url of image
            db.collection("articles").add({ //adding to database 
              actor: {
                description: payload.user.email, //adding details to database
                title: payload.user.displayName,
                date: payload.timestamp,
                image: payload.user.photoURL,
              },
              video: payload.video, //adding the post uploading contents in database
              sharedImg: downLoadURL,
              comments: 0,
              description: payload.description,
            });
            dispatch(setLoading(false));
          }
        );
      } else if (payload.video) { // same concept but for videos
        db.collection("articles").add({
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedImg: "",
          comments: 0,
          description: payload.description,
        });
        dispatch(setLoading(false));
      }
    };
  }

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
  });

export function getArticleAPI() {
    return (dispatch) => {
      let payload;
      db.collection("articles")
        .orderBy("actor.date", "desc")
        .onSnapshot((snapshot) => {
          payload = snapshot.docs.map((doc) => doc.data());
          dispatch(getArticles(payload));
        });
    };
  }

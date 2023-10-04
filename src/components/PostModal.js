import React from 'react'
import { styled } from 'styled-components';
import { connect } from 'react-redux';
import firebase from "firebase";
import ReactPlayer from "react-player";
import { useState } from 'react';
import { postArticleAPI } from '../actions';


function PostModal(props) {
    const [editorText, setEditorText] = useState(""); //for change in state of the text
    const [shareImage, setShareImage] = useState(""); // for change in state of the Image
    const [videoLink, setVideoLink] = useState(""); // for change in state of the Video Link
    const [assetArea, setassetArea] = useState(""); // for Change in state of the Area i.e Post Image or Video link
  
    const handleChange = (e) => { //take image from desktop
      const image = e.target.files[0]; 
      if (image === "" || image === undefined) {
        alert(`not an image,the file is a ${typeof image}`);
        return;
      }
      setShareImage(image); // setting the image
    };
  
    const switchAssetArea = (area) => { //assset area 
      setShareImage(""); // both set image and video are empty first 
      setVideoLink("");
      setassetArea(area);
    };
  
    const postArticle = (e) => { //func to post on the wall of linkedIn
      e.preventDefault();
      if (e.target !== e.currentTarget) {
        return;
      }
      const payload = { //payload = data that we are uploading
        image: shareImage,
        video: videoLink,
        user: props.user,
        description: editorText,
        timestamp: firebase.firestore.Timestamp.now(),
      };
      props.postArticle(payload); //called the function postArticle
      reset(e);
    };
  
    const reset = (e) => {
      setEditorText("");
      setShareImage("");
      setVideoLink("");
      setassetArea("");
  
      props.handleClick(e);
    };
  
    return (
      <div>
        {props.showModal === "open" && ( // if the post Modal is open then show the window for posting 
          <Container>
            <Content>
              <Header>
                <h2>Create a Post</h2>
                <button onClick={(event) => reset(event)}> {/** onClick on create post reset func. is called and resets all the values to empty */}
                  <img src="/images/close-icon.svg " alt="" />
                </button>
              </Header>
              <SharedContent>
                <UserInfo>
                  {props.user.photoURL ? ( // display user image else default photo
                    <img src={props.user.photoURL} />
                  ) : (
                    <img src="/images/user.svg " alt="" />
                  )}
                  <span>{props.user.displayName}</span>
                </UserInfo>
  
                <Editor> {/** text editor area box */}
                  <textarea
                    value={editorText}
                    onChange={(e) => setEditorText(e.target.value)} // onchange set the value of setEditor = whatever is typed
                    placeholder="what do you want to talk about?"
                    autoFocus={true}
                  />
                  {assetArea === "image" ? ( //asset area = image (true) i.e all the functionality to upload photos
                    <UploadImage>
                      <input
                        type="file"
                        accept="image/gif, image/jpeg, image/png"
                        name="image"
                        id="file"
                        style={{ display: "none" }}
                        onChange={handleChange} // this is the function that sets the value of setShareImage to cuurent Image
                      />
                      <p>
                        <label htmlFor="file">Select an image to share</label>
                      </p>
                      {shareImage && (
                        <img src={URL.createObjectURL(shareImage)} /> // image to display on the post modal screen
                      )}
                    </UploadImage>
                  ) : (
                    assetArea === "media" && ( // the else part i.e Image area = media Upload video links
                      <div>
                        <input
                          type="text"
                          placeholder="Please input a video link"
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)} // setVideoLink on onChange
                        />
  
                        {videoLink && (
                          <ReactPlayer width={"100%"} url={videoLink} /> // display video 
                        )}
                      </div>
                    )
                  )}
                </Editor>
              </SharedContent>
              <SharedCreation>
                <AttatchAssets>
                  <AssetButton onClick={() => switchAssetArea("image")}> {/** button to set assest area to Image */}
                    <img src="/images/photo-share.svg " alt="" />
                  </AssetButton>
                  <AssetButton onClick={() => switchAssetArea("media")}> {/** button to set assest area to Image */}
                    <img src="/images/video-share.svg " alt="" />
                  </AssetButton>
                </AttatchAssets>
                <SharedComment>
                  <AssetButton>
                    <img src="/images/share-comment.svg " alt="" />
                    Anyone
                  </AssetButton>
                </SharedComment>
                <PostButton
                  disabled={!editorText ? true : false}
                  onClick={(event) => postArticle(event)} //callled the func. post article onclikc
                >
                  Post
                </PostButton>
              </SharedCreation>
            </Content>
          </Container>
        )}
      </div>
    );
  };
  const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.3s;
  `;
  
  const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
  `;
  const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      height: 40px;
      width: 40px;
      min-width: auto;
      color: rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(0, 0, 0, 0.15); //extra
      svg,
      img {
        pointer-events: none;
      }
    }
  `;
  const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
  `;
  
  const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg,
    img {
      width: 48px;
      height: 48px;
      background-clip: content-box;
      border: 2px solid transparent;
      border-radius: 50%;
    }
    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 1.5;
      margin-left: 5px;
    }
  `;
  const SharedCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
  `;
  
  const AssetButton = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
    border: 1px solid #c1c1c1;
    background-color: #efefef;
    padding-left: 8px;
  `;
  
  const AttatchAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton} {
      width: 34px;
    }
  `;
  
  const SharedComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    ${AssetButton} {
      padding-right: 8px;
      svg,
      img {
        margin-right: 5px;
        align-items: center;
      }
    }
  `;
  const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66a2")};
    color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
    &:hover {
      background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
    }
  `;
  const Editor = styled.div`
    padding: 12px 24px;
    textarea {
      width: 100%;
      min-height: 100px;
      resize: none;
    }
  
    input {
      width: 100%;
      height: 35px;
      font-size: 16px;
      margin-bottom: 20px;
    }
  `;
  const UploadImage = styled.div`
    text-align: center;
    img {
      width: 100%;
    }
  `;
  
  const mapStateToProps = (state) => {
    return {
      user: state.userState.user,
    };
  };
  const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
  });
  export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
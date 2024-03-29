import React from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/forumActions";
import PostPreviewList from "./PostPreviewList";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Filter from "./Flilter";
import Modal from "react-modal";
import Login from "../../Auth/Login";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const Table = styled.table`
  width: 100%;
  background: blue;
  border-spacing: 0;
  border-collapse: separate;
`;
const StyledTr = styled.tr`
  background: #bddff1;
  td:first-child {
    width: 70%;
  }
  td {
    padding-left: 25px;
  }
  p {
    margin: 8px 0;
    letter-spacing: 1px;
    font-weight: 400;
  }
`;
const MainWindow = styled.div`
  border-left: 5px solid #4c394e;
  background: #fff;
  width: 80vw;
  min-width: 400px;
  min-height: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const topics = [
  { title: "Announcments", address: "announcments" },
  { title: "Patch Notes", address: "patch-notes" },
  { title: "Random", address: "random" },
  { title: "New Stores", address: "new-stores" },
  { title: "Updating users", address: "updating-users" },
  { title: "Networking", address: "networking" },
  { title: "Hardware", address: "hardware" }
];

const Wrapper = styled.div`
  width: 80%;
`;

class ViewTopic extends React.Component {
  // topic = this.props.match.params.topic;
  componentDidMount() {
    this.props.fetchPostsByTopic(this.props.match.params.topic).then(res => {
      // if (res.success) {
      //   console.log(res.payload)
      //   this.setState({ posts: res.payload });
      // }
    });
  }
   fetchSavedPosts = () => {
    this.props.fetchSavedPosts().then(res => {
      console.log(res)
      if(!res.success)
        this.openLoginModal();
    });
  }

  fetchTopicPosts = () => {
    this.props.fetchPostsByTopic(this.props.match.params.topic).then(res => {});
  }
  state = {
    //   posts: [],
    currentPage: 1,
    postsPerPage: 5,
    pageViewScope: 3,
    showLoginModal: false
  };
  //this equals to pageNumbersInt

  changePage = num => {
    const lastPage = Math.ceil(
      this.props.forumReducer.posts.length / this.state.postsPerPage
    );
    //console.log("num: " + num);
    //console.log("this.lastPage: " + lastPage);
    if (num < 1) num = 1;
    if (num > lastPage) num = lastPage;
    this.setState({ currentPage: Number(num) });
  };

  openLoginModal = () => {
    this.setState({ showLoginModal: true });
  };

  closeLoginModal = () => {
    this.setState({ showLoginModal: true });
  };
  render() {
    //console.log(this.state);
    const { currentPage, postsPerPage, pageViewScope } = this.state;
    const posts = this.props.forumReducer.posts;
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const displayedPosts = posts.slice(firstPostIndex, lastPostIndex);

    const topic = topics.find(topic => {
      return topic.address == this.props.match.params.topic;
    });

    // Logic for displaying page numbers

    //pageNumbers should be pageViewScope * 2 + 1
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      if (
        i >= currentPage - pageViewScope &&
        i <= currentPage + pageViewScope
      ) {
        pageNumbers.push(i);
      }
      // if(i >= currentPage - pageViewScope)
      //   pageNumbers.push(i);
    }
    const pageNumbersInt = Math.ceil(posts.length / postsPerPage);
    //check if page is one of the first pages
    if (currentPage - pageViewScope < 1) {
      //console.log("scope boundery: first pages");
      //console.log("te");
      const lastViewablePage = Number(currentPage + pageViewScope);
      const startFor = lastViewablePage + 1;
      //console.log("start for: " + startFor);
      //const endFor = lastViewablePage + currentPage - pageViewScope + 1
      const endFor = startFor - currentPage + pageViewScope + 1;
      //console.log("end for: " + endFor);
      for (let i = startFor; i < endFor; i++) {
        //console.log("i: " + i);
        //console.log("pageNumers: " + pageNumbersInt);
        if (i < pageNumbersInt) pageNumbers.push(i);
      }
    }
    //check if page is one of the last pages
    if (currentPage + pageViewScope > pageNumbersInt) {
      //console.log("scope boundery: last pages");
      const firstViewablePage = Number(currentPage - pageViewScope);
      //console.log("firstViewablePage: " + firstViewablePage);
      const boundary = currentPage + pageViewScope - pageNumbersInt;

      const startFor = firstViewablePage - 1;
      const endFor = startFor - boundary + 1;
      //console.log(boundary);
      //console.log("startFor" + startFor);
      //console.log("endFor: " + endFor);
      for (let i = endFor; i <= startFor; i++) {
        if (i > 0) pageNumbers.push(i);
      }
    }

    pageNumbers.sort((a, b) => a - b);

    return (
      <>
        <MainWindow>
          <Wrapper>
            <h2>{topic.title}</h2>
            <Header
              openLoginModal={this.openLoginModal}
              fetchSavedPosts={this.fetchSavedPosts}
              fetchTopicPosts={this.fetchTopicPosts}
            />
            <Filter
              currentPage={currentPage}
              pageNumbers={pageNumbers}
              changePage={this.changePage}
              lastPage={pageNumbersInt}
            />

            <Table>
              <tbody>
                <StyledTr>
                  <td />
                </StyledTr>
                {/* <h1>View Topic {this.props.match.params.topic}</h1> */}
                <PostPreviewList
                  posts={displayedPosts}
                  topic={this.props.match.params.topic}
                />
              </tbody>
            </Table>
          </Wrapper>
        </MainWindow>
        <Modal
          isOpen={this.state.showLoginModal}
          //onAfterOpen={this.afterOpenModal}
          onRequestClose={() => {
            this.setState({ ...this.state, showLoginModal: false });
          }}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <p>Please log-in to vote on posts.</p>
          <Login />
          {/* <button
          onClick={() => {
            setState({ ...getState, isOpen: false });
          }}
        >
          Close
        </button> */}
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchPostsByTopic: topic => dispatch(ACTIONS.fetchPostsByTopic(topic)),
    fetchSavedPosts: () => dispatch(ACTIONS.fetchSavedPosts())

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTopic);

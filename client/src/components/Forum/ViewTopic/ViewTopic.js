import React from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../../actions/forumActions";
import PostPreviewList from "./PostPreviewList";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Filter from "./Flilter";
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

class ViewTopic extends React.PureComponent {
  //  topic = this.props.match.params.topic;
  componentDidMount() {
    this.props.fetchPostsByTopic(this.props.match.params.topic).then(res => {
      if (res.success) {
        console.log(res.payload)
        this.setState({ posts: res.payload });
      }
    });
  }

  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 5,
    pageViewScope: 3
  };
  //this equals to pageNumbersInt

  changePage = num => {
    const lastPage = Math.ceil(this.state.posts.length / this.state.postsPerPage);
    console.log("num: " + num);
    console.log("this.lastPage: " + lastPage);
    if (num < 1) num = 1;
    if (num > lastPage) num = lastPage;
    this.setState({ currentPage: Number(num) });
  };

  render() {
    console.log(this.state);
    const { currentPage, postsPerPage, posts, pageViewScope } = this.state;
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
      console.log("scope boundery: first pages");
      console.log("te");
      const lastViewablePage = Number(currentPage + pageViewScope);
      const startFor = lastViewablePage + 1;
      console.log("start for: " + startFor);
      //const endFor = lastViewablePage + currentPage - pageViewScope + 1
      const endFor = startFor - currentPage + pageViewScope + 1;
      console.log("end for: " + endFor);
      for (let i = startFor; i < endFor; i++) {
        console.log("i: " + i);
        console.log("pageNumers: " + pageNumbersInt);
        if (i < pageNumbersInt) pageNumbers.push(i);
      }
    }
    //check if page is one of the last pages
    if (currentPage + pageViewScope > pageNumbersInt) {
      console.log("scope boundery: last pages");
      const firstViewablePage = Number(currentPage - pageViewScope);
      console.log("firstViewablePage: " + firstViewablePage);
      const boundary = currentPage + pageViewScope - pageNumbersInt;

      const startFor = firstViewablePage - 1;
      const endFor = startFor - boundary + 1;
      console.log(boundary);
      console.log("startFor" + startFor);
      console.log("endFor: " + endFor);
      for (let i = endFor; i <= startFor; i++) {
        if (i > 0) pageNumbers.push(i);
      }
    }

    pageNumbers.sort((a, b) => a - b);

    return (
      <Wrapper>
        <h2>{topic.title}</h2>
        <Header />
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
            <PostPreviewList posts={displayedPosts} />
          </tbody>
        </Table>
      </Wrapper>
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
    fetchPostsByTopic: topic => dispatch(ACTIONS.fetchPostsByTopic(topic))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTopic);

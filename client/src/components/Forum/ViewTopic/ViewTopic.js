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
        this.setState({ posts: res.payload });
      }
    });
  }

  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 10
  };

  changePage = e => {
    this.setState({ currentPage: e.target.id });
  };
  render() {
    const { currentPage, postsPerPage, posts } = this.state;
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const displayedPosts = posts.slice(firstPostIndex, lastPostIndex);

    const topic = topics.find(topic => {
      return topic.address == this.props.match.params.topic;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      if (i >= currentPage - 3 && i <= currentPage + 3) pageNumbers.push(i);
    }

    return (
      <Wrapper>
        <h2>{topic.title}</h2>
        <Header />
        <Filter pageNumbers={pageNumbers} changePage={this.changePage} />

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

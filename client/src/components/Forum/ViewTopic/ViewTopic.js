import React from 'react';
import {connect} from 'react-redux'
import * as ACTIONS from '../../../actions/forumActions';
class ViewTopic extends React.PureComponent {
//  topic = this.props.match.params.topic;
  componentDidMount() {
    this.props.fetchPostsByTopic(this.props.match.params.topic).then(res => {
      console.log(res);
    })
  }
  render() {
    return(
      <div>
        <h1>View Topic {this.props.match.params.topic}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    forumReducer: state.forumReducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchPostsByTopic: topic => dispatch(ACTIONS.fetchPostsByTopic(topic))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ViewTopic)
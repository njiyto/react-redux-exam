import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';

const QuestionsList = ({ list }) => {

  if (!list.length) {
    return <div style={{ marginTop: 20 }}>list is empty</div>
  }

  return (
    <div>
      {list.map(el => (
        <Question
          key={el.id}
          {...el}
        />
      ))}
    </div>
  )
}

const mapStateToProps = ({ users, questions, authedUser }, { type }) => {
  const user = users.data[authedUser];
  const answered = Object.keys(user.answers);
  let list = [];
  if (type === 'answered') {
    list = answered.map(el => questions.data[el])
  } else {
    const unanswered =  Object.keys(questions.data).filter(el => !answered.includes(el));
    list = unanswered.map(el => questions.data[el])
  }

  list.sort((a, b) =>  b.timestamp - a.timestamp)


  return {
    list
  }
}

export default connect(mapStateToProps)(QuestionsList)

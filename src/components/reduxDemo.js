import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/count'

function Home({ number, increase, decrease }) {
  return (
    <div>
      Some state changes:
      {number}
      <button onClick={() => increase(1)}>Increase</button>
      <button onClick={() => decrease(1)}>Decrease</button>
    </div>
  )
}

export default connect(
  state => ({ number: state.count.number }),  // mapStateToProps
  { increase, decrease }  //mapDispatchToProps
)(Home)


/*
// Connect to Redux
function mapStateToProps(state) {
  return {
    // propsを通して取得する際に使う名前: Storeのstateの値
    value: state.value,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // propsを通して取得する際に使う名前
    onClick(value) {
      // Storeのdispatchメソッド（引数はAction Creator）
      dispatch(send(value));
    },
  };
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormApp);

*/
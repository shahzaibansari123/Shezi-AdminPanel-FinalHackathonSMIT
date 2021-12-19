import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { Login } from './Components/Login'
import { NotFound } from './Components/NotFound'
import { Signup } from './Components/Signup'
import { auth, db } from './Config/Config'

export class App extends Component {
  state = {
    currentUser: null,
    infos: [],
    editInfoValue: null
  }
  componentDidMount() {
    // getting current user
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users').doc(user.uid).get().then(snapshot => {
          this.setState({
            currentUser: snapshot.data().Name
          })
        })
      }
      else {
        console.log('user is not signed in to retrive username')
      }
    })

    auth.onAuthStateChanged(user => {
      if (user) {
        const infoList = this.state.infos;
        db.collection('infos of ' + user.uid).onSnapshot(snapshot => {
          let changes = snapshot.docChanges();
          changes.forEach(change => {
            if (change.type === 'added') {
              infoList.push({
                id: change.doc.id,
                Info: change.doc.data().Info
              })
            }
            if (change.type === 'removed') {
              // console.log(change.type);
              for (var i = 0; i < infoList.length; i++) {
                if (infoList[i].id === change.doc.id) {
                  infoList.splice(i, 1);
                }
              }
            }
            this.setState({
              infos: infoList
            })
          })
        })
      }
      else {
        console.log('user is not signed in to retrive infos');
      }
    })

  }


  updateInfoHandler = (editInfo, id) => {
    // console.log(editTodo, id);
    const infoList = this.state.infos;
    for (var i = 0; i < infoList.length; i++) {
      if (infoList[i].id === id) {
        infoList.splice(i, 1, { id, Info: editInfo });
      }
      this.setState({
        infos: infoList
      })
    }
  }

  render() {
    // console.log(this.state.todos);
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={() => <Home
            currentUser={this.state.currentUser}
            infos={this.state.infos}
          />} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App

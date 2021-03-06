import React, { Component } from 'react';
import Web3 from 'web3'
import Navebar from './Navebar';
import Main from './Main';
import TodoList from '../abis/TodoList.json';

class App extends Component {
    async componentDidMount(){
        await this.loadWeb3()
        await this.loadBlockChainData()
      }
    async loadWeb3(){
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3){
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying Metamask!')
        }
      }
    async loadBlockChainData(){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        const networkId = await web3.eth.net.getId()
    
        const todoListData = TodoList.networks[networkId]
        if(todoListData){
          const todoList = new web3.eth.Contract(TodoList.abi, todoListData.address)
          this.setState({ todoList })
          console.log(todoList);
          const taskCount = await todoList.methods.taskCount.call()
          console.log(taskCount);
          this.setState({taskCount})
          for (var i = 1; i <= taskCount; i++){
              const task = await todoList.methods.tasks(i).call()
              this.setState({ tasks: [...this.state.tasks, task] })
          } 
          // console.log(this.state.todoList.methods.tasks(0));
          // let createTask = await todoList.methods.createTask(this.state.content).call()
          // let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
          // this.setState({ daiTokenBalance: daiTokenBalance.toString() })
        }
        else {
        window.alert('TodoList contract not deployed to detected network')
        }
        this.setState({ loading: false})
    }

    createTask = (content) => {
      this.setState({ loading: true })
      this.state.todoList.methods.createTask(content).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false})
      })
    }

    constructor(props){
        super(props)
        this.state = {
            account: '',
            todoList: {},
            loading: true,
            taskCount: 0,
            tasks: []
        }
        this.createTask = this.createTask.bind(this)
    }
  render() {
    return (
      <div className="App">
        <Navebar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto">
                {this.state.loading ? <div>Loading</div> : <Main 
                tasks={this.state.tasks}
                createTask={this.createTask} />}
                {console.log(this.state.tasks)}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    
  }

  receivedData() {
    axios
      .get(
        "https://raw.githubusercontent.com/PavleGavrilovic/REACT-FromSoftware-website/master/src/data/data.json"
      )
      .then((res) => {
        const data = res.data;
        for(let i=0;i<data.length;i++){
          if(data[i].type==="DLC"){
            data.splice(i,1);
            }
          }
          console.log(data)
          for(let i=0;i<data.length;i++){
            if(data[i].type==="DLC"){
              data.splice(i,1);
              }
            }
            console.log(data)
        const slice = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
        
        
        
        const postData = slice.map((pd) => (
          <React.Fragment>
            <div key={pd.id} className="gameArticle" data-id={pd.id}>
              <h4 className="gameHeader">
                {pd.name} ({pd.year})
              </h4>
              <img src={pd.image} alt="gameImg" className="gameImg"></img>
              <p className="gameType">
                type: <b>{pd.type}</b>
              </p>
              <p className="gamePrice">
                <b>${pd.price}</b>
              </p>
              <button className="addGame" onClick={addToCart}>
                Add To Cart
              </button>
            </div>
          </React.Fragment>
        ));

        function addToCart(e) {
          
          const items  = data;
          let clicked = e.currentTarget.parentNode.dataset.id;
          e.currentTarget.disabled=true;
          e.currentTarget.innerHTML="Item in Cart";
          e.currentTarget.style.color="grey";
      
          let find = items.find(function (param) {
            if (Number(param.id) === Number(clicked)) {
              return param;
            } else {
              return null;
            }
          });
          if(JSON.parse(localStorage.getItem("fromArr"))){
            let getArr=JSON.parse(localStorage.getItem("fromArr"));
            getArr.push(find);
            console.log(getArr)
            localStorage.setItem("fromArr",JSON.stringify(getArr));
          }else{
            localStorage.setItem("fromArr",JSON.stringify([find]));
          }
         
        }

        

        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          postData,
        });
      });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  

  componentDidMount() {
    this.receivedData()
}
render() {
    return (
        <div id="pagination">
            {this.state.postData}
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}/>
        </div>

    )
}
}

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };

    
  }


  

  render() {
    

    return (
      <div>
        
        <Pagination />
      </div>
    );
  }
}

export default Games;

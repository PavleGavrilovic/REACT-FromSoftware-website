import React, { Component } from 'react';


class Sekiro extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          items: [],
        };
    
        this.addToCart=this.addToCart.bind(this);
      }

    componentDidMount() {
        fetch(
          "https://raw.githubusercontent.com/PavleGavrilovic/REACT-FromSoftware-website/master/src/data/data.json"
        )
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              items: result,
            });
          });
      }

      addToCart(e) {
          
        const items  = this.state.items;
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

    render(){
        const { items }=this.state;

        
        let array=[];
        for(let i=0;i<items.length;i++){
        if(items[i].series==="Sekiro"){
          array.push(items[i]);
          }
        }


        return(
            <div>
              <h1 className="pageHeader">Sekiro</h1>
               <div id="gameWrapper">
          {
          array.map((item) => (
            <div key={item.id} className="gameArticle" data-id={item.id}>
              <h4 className="gameHeader">
                {item.name} ({item.year})
              </h4>
              <img src={item.image} alt="gameImg" className="gameImg"></img>
              <p className="gameType">
                type: <b>{item.type}</b>
              </p>
              <p className="gamePrice">
                <b>${item.price}</b>
              </p>
              <button className="addGame" onClick={this.addToCart}>
                Add To Cart
              </button>
            </div>
          ))}
          
        </div>
            </div>
        )
    }
}

export default Sekiro;
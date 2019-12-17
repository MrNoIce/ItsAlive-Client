import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
  },
}));


const MyCart = props => {
  const [products, setProducts] = useState([]);
  const [paymenttypes, setPaymentTypes] = useState([]);
  const payment = useRef();
  const classes = useStyles();


  const getOpenOrder = () => {

    fetch(`http://localhost:8000/orders/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("itsalive_token")}`
      }
    })
      .then(response => {
        return response.json();
      })

      .then((response) => {
        if("message" in response === true){
          alert("Please add a product to begin a cart")
          props.history.push("/")
        }
        else{
          console.log("response", response)
      setProducts(response)};
  });
}

  const getPaymentTypes = () => {
    fetch(
      `http://localhost:8000/paymenttypes?customer_id=${localStorage.getItem(
        "customer_id"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Token ${localStorage.getItem("itsalive_token")}`
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(setPaymentTypes);
  };

  const deleteItem = productItem => {
    fetch(`http://localhost:8000/orders/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("itsalive_token")}`
      },
      body: JSON.stringify({
        "product_id": productItem
      })
    }).then(() => {
      getOpenOrder()
    });
  };

  const completeOrder = () => {
    if(payment.current.value === ""){
      alert("Please Select a Payment Type Fool!")
    }
    else{
    fetch(`http://localhost:8000/orders/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("itsalive_token")}`
      },
      body: JSON.stringify({
        "payment_id": payment.current.value
      })
    })
    .then(() => {
      props.history.push("/")
    })
  }};

  const cancelOrder = () => {
    console.log("delete works")
    fetch(`http://localhost:8000/orders/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("itsalive_token")}`
      }
    }).then(() => {
      alert("Your Order has been canceled")
      props.history.push("/")
    });
  };

  useEffect(() => {
    getOpenOrder();
    getPaymentTypes();
  }, []);

  return (
    <>
      <main className="order-items">
        <h2>My Cart</h2>
        <ul>

          {products.map(item => {
            return (
              <Paper className={classes.root} key={item.id}>
                <Button
                  onClick={() => {
                    deleteItem(item.id);
                  }} color="primary" size='small'
                >
                  <RemoveShoppingCartIcon />
                </Button>
                {item.name}: {item.price}
              </Paper>
            );
          })}
        </ul>
        <Paper className={classes.root}>
        <label htmlFor="paymenttypes"> Select a Payment: </label>
        <select ref={payment}>
          <option value="" >
            Select a payment type...
          </option>
          {paymenttypes.map(payment => (
            <option key={payment.id} value={payment.id}>
              {payment.merchant_name}
            </option>
          ))}
        </select>
        <button
          className="fakeLink addToOrder__link"
          onClick={() => completeOrder()}
        >
          {" "}
          Complete Order{" "}
        </button>
        <br></br>
        <button onClick={cancelOrder}>Cancel Order</button>
        </Paper>
      </main>
    </>
  );
};

export default MyCart;


import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel } from '@ionic/react';
import React, {useState, useEffect} from 'react';
import './Tab1.css';

const Tab1: React.FC = () => {
  // dataset state variable to hold JSON data from WP
  const [dataset, setDataset] = useState([]);
  // URL for WP JSON REST endpoint
  const dataURL = "https://dev-cs-55-13-site.pantheonsite.io/wp-json/twentytwentyone-child/v1/product/";
  // useEffect() to get JSON data and populate dataset state variable
  useEffect(() => {
    fetch(dataURL) // fetch() to load raw json string
    .then(response => response.json()) // json() to convert raw string to json object
    .then(data => {
      console.log(data); 
      setDataset(data); 
    })
    .catch(error => console.error("Error fetching data:", error)); 
}, [])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Products</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* use map() to loop through JSON array returned from WP */}
        <IonList id="thing-list">
          <IonListHeader>Products</IonListHeader>
          {dataset.map((item, index) => (
            <IonItem lines="inset" key={index}>
              <IonLabel>
              <IonListHeader>{item.post_title}</IonListHeader>
              <br></br>
                <h4>{item.product_name} <span>{item.product_price}</span></h4>
                <div dangerouslySetInnerHTML={{ __html: item.post_content }} />
                <p>{item.product_description}</p>
                <address>{item.thing_address}</address>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

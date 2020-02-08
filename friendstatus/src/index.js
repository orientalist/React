import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const friendList = [
  { id: 1, name: "Phoebe" },
  { id: 2, name: "Rachel" },
  { id: 3, name: "Ross" }
];

function ChatRecipientPicker() {
  console.log("b---start");
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
  console.log(`b---${isRecipientOnline}`);

  return (
    <div>
      {console.log("rendering")}
      <div>
        Status:
        {isRecipientOnline === null
          ? "Loading"
          : isRecipientOnline
          ? "Online"
          : "Offline"}
      </div>
      <select
        value={recipientID}
        onChange={e => {
          setRecipientID(e.target.value);
          console.log("-----------------------");
        }}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  console.log(`a---${isOnline}`);

  useEffect(() => {
    console.log("a---start use");
    function handleStatusChange(status) {
      console.log("a---call back");
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    //setIsOnline(false);

    return () => {
      console.log("a---clear");
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  }, [friendID]);
  console.log("a---use finish");
  return isOnline;
}

const ChatAPI = {
  id: null,
  subscribeToFriendStatus: function(id, callBack) {
    setTimeout(() => {
      if (this.id !== id) {
          console.log(`last id:${this.id}`,`mow id:${id}`);
        callBack({
          isOnline: Math.floor(Math.random() * 10) % 2 === 0 ? true : false
        });
      }
      else{
          console.log('the callback is expired');
          console.log(`last id:${this.id}`,`mow id:${id}`);
      }
    }, 10000);
  },
  unsubscribeFromFriendStatus: function(id, callBack) {
    this.id = id;
  }
};

function FriendListItem(props) {
  console.log("b---start");
  const isOnline = useFriendStatus(props.friend);

  return (
    <div>
      {console.log("b---rendering")}
      Status:{isOnline === null ? "Loading" : isOnline ? "Online" : "Offline"}
    </div>
  );
}

ReactDOM.render(<ChatRecipientPicker />, document.getElementById("root"));

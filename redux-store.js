//Action Creators
//Person who is submitting the form
const newBooking = (name, amount) => {
    return {
        type: "NEW_BOOKING",
        payload: {
            name,
            amount,
        },
    };
};

const cancelBooking = (name, refundAmount) => {
    return {
        type: "CANCEL_BOOKING",
        payload: {
            name,
            refundAmount,
        },
    };
};

// Create a reducers

const reservationHistory = (oldReservattionHistory = [], action) => {
    if (action.type === "NEW_BOOKING") {
        return [...oldReservattionHistory, action.payload]

    } else if (action.type === "CANCEL_BOOKING") {
        return oldReservattionHistory.filter((record) => {
            return record.name !== action.payload.name;
        })
    }
    return oldReservattionHistory
}

const cancellationHistory = (oldcancellatitonHistory = [], action) => {
    if (action.type === "CANCEL_BOOKING") {
        return [...oldcancellatitonHistory, action.payload]
    }
    return oldcancellatitonHistory
}

const accounting = (totalMoney = 100, action) => {
    if (action.type === "NEW_BOOKING") {
        return totalMoney + action.payload.amount
    } else if (action.type === "CANCEL_BOOKING") {
        return totalMoney - action.payload.amount
    }
    return totalMoney
}

//Redux Store

const { createStore, combineReducers } = Redux

const railwayCentralStore = combineReducers({
    accounting: accounting,
    reservationHistory: reservationHistory,
    cancellationHistory: cancellationHistory
})

const store = createStore(railwayCentralStore)

// console.log(store.getState())

// Get the form element
const form = document.getElementById('myForm');

// Event listener for form submission
form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values from the form fields
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;

    // Perform actions with the form values (e.g., send data to server, manipulate DOM, etc.)
    console.log('Name:', name);
    console.log('Amount:', amount);
    const action = newBooking(name, amount)
    store.dispatch(action)
    console.log(store.getState())
    const reservationList = store.getState().reservationHistory
    // Get the parent div
    var listBooking = document.getElementById('booking_list');
    // Loop through child elements and remove them
    while (listBooking.firstChild) {
        listBooking.removeChild(listBooking.firstChild);
    }
    reservationList.forEach((item) => {
        listBooking.insertAdjacentHTML('beforeend', `
            <li class="list-group-item">
                <p>Booking Name - ${item.name} <br> Booking Amount - ${item.amount}</p>
                <button class="btn-primary btn-cancel" data="${item.name}">Cancel Booking</button>
            </li>
        `);
    });

    // Clear the form fields (if needed)
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
});

const cancleBookingbtn = document.getElementsByClassName("btn-cancel")

cancleBookingbtn.addEventListener("click", function (e) {
    console.log(e)
})
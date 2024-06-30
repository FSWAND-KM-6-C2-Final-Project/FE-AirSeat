import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast, Bounce } from "react-toastify";

import { seoTitle } from "string-fn";
import dayjs from "dayjs";
import Select from "react-select";
import { CiDiscount1 } from "react-icons/ci";

const countryOptions = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Åland Islands", label: "Åland Islands" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "American Samoa", label: "American Samoa" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Anguilla", label: "Anguilla" },
  { value: "Antarctica", label: "Antarctica" },
  { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Aruba", label: "Aruba" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Barbados", label: "Barbados" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Belize", label: "Belize" },
  { value: "Benin", label: "Benin" },
  { value: "Bermuda", label: "Bermuda" },
  { value: "Bhutan", label: "Bhutan" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
  { value: "Botswana", label: "Botswana" },
  { value: "Bouvet Island", label: "Bouvet Island" },
  { value: "Brazil", label: "Brazil" },
  {
    value: "British Indian Ocean Territory",
    label: "British Indian Ocean Territory",
  },
  { value: "Brunei Darussalam", label: "Brunei Darussalam" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "Burundi", label: "Burundi" },
  { value: "Cambodia", label: "Cambodia" },
  { value: "Cameroon", label: "Cameroon" },
  { value: "Canada", label: "Canada" },
  { value: "Cape Verde", label: "Cape Verde" },
  { value: "Cayman Islands", label: "Cayman Islands" },
  { value: "Central African Republic", label: "Central African Republic" },
  { value: "Chad", label: "Chad" },
  { value: "Chile", label: "Chile" },
  { value: "China", label: "China" },
  { value: "Christmas Island", label: "Christmas Island" },
  { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
  { value: "Colombia", label: "Colombia" },
  { value: "Comoros", label: "Comoros" },
  { value: "Congo", label: "Congo" },
  {
    value: "Congo, The Democratic Republic of The",
    label: "Congo, The Democratic Republic of The",
  },
  { value: "Cook Islands", label: "Cook Islands" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Cote D'ivoire", label: "Cote D'ivoire" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cuba", label: "Cuba" },
  { value: "Curaçao", label: "Curaçao" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czech Republic", label: "Czech Republic" },
  { value: "Denmark", label: "Denmark" },
  { value: "Djibouti", label: "Djibouti" },
  { value: "Dominica", label: "Dominica" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "Egypt", label: "Egypt" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "Equatorial Guinea", label: "Equatorial Guinea" },
  { value: "Eritrea", label: "Eritrea" },
  { value: "Estonia", label: "Estonia" },
  { value: "Ethiopia", label: "Ethiopia" },
  {
    value: "Falkland Islands (Malvinas)",
    label: "Falkland Islands (Malvinas)",
  },
  { value: "Faroe Islands", label: "Faroe Islands" },
  { value: "Fiji", label: "Fiji" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "French Guiana", label: "French Guiana" },
  { value: "French Polynesia", label: "French Polynesia" },
  {
    value: "French Southern Territories",
    label: "French Southern Territories",
  },
  { value: "Gabon", label: "Gabon" },
  { value: "Gambia", label: "Gambia" },
  { value: "Georgia", label: "Georgia" },
  { value: "Germany", label: "Germany" },
  { value: "Ghana", label: "Ghana" },
  { value: "Gibraltar", label: "Gibraltar" },
  { value: "Greece", label: "Greece" },
  { value: "Greenland", label: "Greenland" },
  { value: "Grenada", label: "Grenada" },
  { value: "Guadeloupe", label: "Guadeloupe" },
  { value: "Guam", label: "Guam" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Guernsey", label: "Guernsey" },
  { value: "Guinea", label: "Guinea" },
  { value: "Guinea-bissau", label: "Guinea-bissau" },
  { value: "Guyana", label: "Guyana" },
  { value: "Haiti", label: "Haiti" },
  {
    value: "Heard Island and Mcdonald Islands",
    label: "Heard Island and Mcdonald Islands",
  },
  {
    value: "Holy See (Vatican City State)",
    label: "Holy See (Vatican City State)",
  },
  { value: "Honduras", label: "Honduras" },
  { value: "Hong Kong", label: "Hong Kong" },
  { value: "Hungary", label: "Hungary" },
  { value: "Iceland", label: "Iceland" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran, Islamic Republic of", label: "Iran, Islamic Republic of" },
  { value: "Iraq", label: "Iraq" },
  { value: "Ireland", label: "Ireland" },
  { value: "Isle of Man", label: "Isle of Man" },
  { value: "Israel", label: "Israel" },
  { value: "Italy", label: "Italy" },
  { value: "Jamaica", label: "Jamaica" },
  { value: "Japan", label: "Japan" },
  { value: "Jersey", label: "Jersey" },
  { value: "Jordan", label: "Jordan" },
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Kenya", label: "Kenya" },
  { value: "Kiribati", label: "Kiribati" },
  {
    value: "Korea, Democratic People's Republic of",
    label: "Korea, Democratic People's Republic of",
  },
  { value: "Korea, Republic of", label: "Korea, Republic of" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Kyrgyzstan", label: "Kyrgyzstan" },
  {
    value: "Lao People's Democratic Republic",
    label: "Lao People's Democratic Republic",
  },
  { value: "Latvia", label: "Latvia" },
  { value: "Lebanon", label: "Lebanon" },
  { value: "Lesotho", label: "Lesotho" },
  { value: "Liberia", label: "Liberia" },
  { value: "Libyan Arab Jamahiriya", label: "Libyan Arab Jamahiriya" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Macao", label: "Macao" },
  {
    value: "Macedonia, The Former Yugoslav Republic of",
    label: "Macedonia, The Former Yugoslav Republic of",
  },
  { value: "Madagascar", label: "Madagascar" },
  { value: "Malawi", label: "Malawi" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Maldives", label: "Maldives" },
  { value: "Mali", label: "Mali" },
  { value: "Malta", label: "Malta" },
  { value: "Marshall Islands", label: "Marshall Islands" },
  { value: "Martinique", label: "Martinique" },
  { value: "Mauritania", label: "Mauritania" },
  { value: "Mauritius", label: "Mauritius" },
  { value: "Mayotte", label: "Mayotte" },
  { value: "Mexico", label: "Mexico" },
  {
    value: "Micronesia, Federated States of",
    label: "Micronesia, Federated States of",
  },
  { value: "Moldova, Republic of", label: "Moldova, Republic of" },
  { value: "Monaco", label: "Monaco" },
  { value: "Mongolia", label: "Mongolia" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Morocco", label: "Morocco" },
  { value: "Mozambique", label: "Mozambique" },
  { value: "Myanmar", label: "Myanmar" },
  { value: "Namibia", label: "Namibia" },
  { value: "Nauru", label: "Nauru" },
  { value: "Nepal", label: "Nepal" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Caledonia", label: "New Caledonia" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Niger", label: "Niger" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Niue", label: "Niue" },
  { value: "Norfolk Island", label: "Norfolk Island" },
  { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
  { value: "Norway", label: "Norway" },
  { value: "Oman", label: "Oman" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Palau", label: "Palau" },
  {
    value: "Palestinian Territory, Occupied",
    label: "Palestinian Territory, Occupied",
  },
  { value: "Panama", label: "Panama" },
  { value: "Papua New Guinea", label: "Papua New Guinea" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "Pitcairn", label: "Pitcairn" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Puerto Rico", label: "Puerto Rico" },
  { value: "Qatar", label: "Qatar" },
  { value: "Reunion", label: "Reunion" },
  { value: "Romania", label: "Romania" },
  { value: "Russia", label: "Russia" },
  { value: "Rwanda", label: "Rwanda" },
  { value: "Saint Helena", label: "Saint Helena" },
  { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
  { value: "Saint Lucia", label: "Saint Lucia" },
  { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
  {
    value: "Saint Vincent and The Grenadines",
    label: "Saint Vincent and The Grenadines",
  },
  { value: "Samoa", label: "Samoa" },
  { value: "San Marino", label: "San Marino" },
  { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Senegal", label: "Senegal" },
  { value: "Serbia", label: "Serbia" },
  { value: "Seychelles", label: "Seychelles" },
  { value: "Sierra Leone", label: "Sierra Leone" },
  { value: "Singapore", label: "Singapore" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Solomon Islands", label: "Solomon Islands" },
  { value: "Somalia", label: "Somalia" },
  { value: "South Africa", label: "South Africa" },
  {
    value: "South Georgia and The South Sandwich Islands",
    label: "South Georgia and The South Sandwich Islands",
  },
  { value: "Spain", label: "Spain" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Sudan", label: "Sudan" },
  { value: "Suriname", label: "Suriname" },
  { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" },
  { value: "Eswatini", label: "Eswatini" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Syrian Arab Republic", label: "Syrian Arab Republic" },
  { value: "Taiwan (ROC)", label: "Taiwan (ROC)" },
  { value: "Tajikistan", label: "Tajikistan" },
  {
    value: "Tanzania, United Republic of",
    label: "Tanzania, United Republic of",
  },
  { value: "Thailand", label: "Thailand" },
  { value: "Timor-leste", label: "Timor-leste" },
  { value: "Togo", label: "Togo" },
  { value: "Tokelau", label: "Tokelau" },
  { value: "Tonga", label: "Tonga" },
  { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
  { value: "Tunisia", label: "Tunisia" },
  { value: "Turkey", label: "Turkey" },
  { value: "Turkmenistan", label: "Turkmenistan" },
  { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" },
  { value: "Tuvalu", label: "Tuvalu" },
  { value: "Uganda", label: "Uganda" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  {
    value: "United States Minor Outlying Islands",
    label: "United States Minor Outlying Islands",
  },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Uzbekistan", label: "Uzbekistan" },
  { value: "Vanuatu", label: "Vanuatu" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "Virgin Islands, British", label: "Virgin Islands, British" },
  { value: "Virgin Islands, U.S.", label: "Virgin Islands, U.S." },
  { value: "Wallis and Futuna", label: "Wallis and Futuna" },
  { value: "Western Sahara", label: "Western Sahara" },
  { value: "Yemen", label: "Yemen" },
  { value: "Zambia", label: "Zambia" },
  { value: "Zimbabwe", label: "Zimbabwe" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #D1D5DB",
    borderRadius: "0.5rem",
    cursor: "pointer",
    minHeight: "auto",
    padding: "4px",
    background: "white",
    "&:hover": {
      borderColor: "#aaa",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#6b7280",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: "pointer",
    "&:hover": {
      background: "#f1f1f1",
    },
  }),
};

const seatLayout = [
  {
    type: "First Class",
    rows: [
      ["1A", "", "", "", "", "", "1B"],
      ["2A", "", "", "", "", "", "2B"],
    ],
  },
  {
    type: "Business Class",
    rows: [
      ["3A", "3B", "", "", "", "3C", "3D"],
      ["4A", "4B", "", "", "", "4C", "4D"],
      ["5A", "5B", "", "", "", "5C", "5D"],
      ["6A", "6B", "", "", "", "6C", "6D"],
      ["7A", "7B", "", "", "", "7C", "7D"],
    ],
  },
  {
    type: "Premium Economy",
    rows: [
      ["8A", "8B", "", "", "", "8C", "8D"],
      ["9A", "9B", "", "", "", "9C", "9D"],
      ["10A", "10B", "", "", "", "10C", "10D"],
      ["11A", "11B", "", "", "", "11C", "11D"],
      ["12A", "12B", "", "", "", "12C", "12D"],
      ["13A", "13B", "", "", "", "13C", "13D"],
    ],
  },
  {
    type: "Economy",
    rows: [
      ["14A", "14B", "14C", "", "14D", "14E", "14F"],
      ["15A", "15B", "15C", "", "15D", "15E", "15F"],
      ["16A", "16B", "16C", "", "16D", "16E", "16F"],
      ["17A", "17B", "17C", "", "17D", "17E", "17F"],
      ["18A", "18B", "18C", "", "18D", "18E", "18F"],
      ["19A", "19B", "19C", "", "19D", "19E", "19F"],
      ["20A", "20B", "20C", "", "20D", "20E", "20F"],
      ["21A", "21B", "21C", "", "21D", "21E", "21F"],
      ["22A", "22B", "22C", "", "22D", "22E", "22F"],
      ["23A", "23B", "23C", "", "23D", "23E", "23F"],
      ["24A", "24B", "24C", "", "24D", "24E", "24F"],
      ["25A", "25B", "25C", "", "25D", "25E", "25F"],
    ],
  },
];

const classTypes = {
  economy: "Economy",
  premium_economy: "Premium Economy",
  business: "Business Class",
  first_class: "First Class",
};

const BookingForm = ({
  initialClass,
  onBookingData,
  seatStatus,
  seatStatusReturn,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredSeats, setFilteredSeats] = useState([]);
  const [filteredReturnSeats, setFilteredReturnSeats] = useState([]);
  const [maxSeatCount, setMaxSeatCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [orderData, setOrderData] = useState({
    fullName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    hasLastName: true,
  });

  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const adultCount = parseInt(searchParams.get("adult")) || 0;
    const infantCount = parseInt(searchParams.get("infant")) || 0;
    const childrenCount = parseInt(searchParams.get("children")) || 0;
    const seatClass = searchParams.get("class") || "economy";

    const totalPassengers = adultCount + childrenCount;
    setMaxSeatCount(totalPassengers);

    const adultFormTemplate = {
      title: "Mr.",
      fullName: "",
      lastName: "",
      dob: "",
      nationality: "",
      idType: "ktp",
      idNumber: "",
      issuingCountry: "",
      expiryDate: "",
      hasLastName: true,
      type: "adult",
    };

    const infantFormTemplate = {
      title: "Mr.",
      fullName: "",
      lastName: "",
      dob: "",
      nationality: "",
      idType: "ktp",
      idNumber: "",
      issuingCountry: "",
      expiryDate: "",
      hasLastName: true,
      type: "infant",
    };

    const childrenFormTemplate = {
      title: "Mr.",
      fullName: "",
      lastName: "",
      dob: "",
      nationality: "",
      idType: "ktp",
      idNumber: "",
      issuingCountry: "",
      expiryDate: "",
      hasLastName: true,
      type: "children",
    };

    const adults = Array(adultCount)
      .fill()
      .map(() => ({ ...adultFormTemplate }));
    const infants = Array(infantCount)
      .fill()
      .map(() => ({ ...infantFormTemplate }));
    const children = Array(childrenCount)
      .fill()
      .map(() => ({ ...childrenFormTemplate }));

    const allPassengers = [...children, ...adults, ...infants];

    setPassengers(allPassengers);

    const selectedClassType = classTypes[seatClass];
    const filtered = seatLayout.find(
      (layout) => layout.type === selectedClassType
    );
    setFilteredSeats([filtered]);
  }, []);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsReturn, setSelectedSeatsReturn] = useState([]);
  const [selectedInfantSeats, setSelectedInfantSeats] = useState([]);
  const [selectedInfantSeatsReturn, setSelectedInfantSeatsReturn] = useState(
    []
  );

  const handleOrderChange = (e) => {
    setIsSaved(false);
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handlePassengerChange = (index, e) => {
    setIsSaved(false);

    const { name, value } = e.target;
    const newPassengers = [...passengers];
    newPassengers[index][name] = value;
    setPassengers(newPassengers);
  };

  const handleSeatSelection = (seat, isReturn = false) => {
    setIsSaved(false);

    if (isReturn) {
      if (
        !selectedSeatsReturn.includes(seat) &&
        selectedSeatsReturn.length < maxSeatCount
      ) {
        setSelectedSeatsReturn([...selectedSeatsReturn, seat]);
        setSelectedInfantSeatsReturn([seat]);
      } else if (selectedSeatsReturn.includes(seat)) {
        setSelectedSeatsReturn(selectedSeatsReturn.filter((s) => s !== seat));
        setSelectedInfantSeatsReturn([]);
      }
    } else {
      if (
        !selectedSeats.includes(seat) &&
        selectedSeats.length < maxSeatCount
      ) {
        setSelectedSeats([...selectedSeats, seat]);
        setSelectedInfantSeats([seat]);
      } else if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        setSelectedInfantSeats([]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clickedSeats = selectedSeats.length;
    const clickedReturnSeats = selectedSeatsReturn.length;

    if (clickedSeats < maxSeatCount) {
      toast.error(
        `You've just chosen ${clickedSeats} out of ${maxSeatCount} seats, choose the remaining ${
          parseInt(maxSeatCount) - parseInt(clickedSeats)
        }.`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } else if (seatStatusReturn && clickedReturnSeats < maxSeatCount) {
      toast.error(
        `You've just chosen ${clickedReturnSeats} out of ${maxSeatCount} return seats, choose the remaining ${
          parseInt(maxSeatCount) - parseInt(clickedReturnSeats)
        }.`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } else {
      if (seatStatusReturn) {
        const bookingData = {
          flight_id: parseInt(searchParams.get("flightId")),
          return_flight_id: parseInt(searchParams.get("returnFlightId")),
          payment_method: "snap",
          ordered_by: {
            first_name: orderData.fullName,
            last_name: orderData.lastName || "",
            phone_number: orderData.phoneNumber,
            email: orderData.email,
          },
          passenger: passengers.map((passenger, index) => ({
            first_name: passenger.fullName,
            last_name: passenger.lastName || "",
            dob: dayjs(passenger.dob).toISOString(),
            title: passenger.title.toLowerCase().slice(0, -1),
            nationality: passenger.nationality,
            passenger_type: passenger.type,
            identification_type: passenger.idType.toLowerCase(),
            identification_number: passenger.idNumber,
            identification_country: passenger.issuingCountry || "Indonesia",
            identification_expired: passenger.expiryDate
              ? dayjs(passenger.expiryDate).toISOString()
              : "",
            seat_departure:
              passenger.type === "infant"
                ? parseSeat(selectedInfantSeats[0])
                : parseSeat(selectedSeats[index]),
            seat_return:
              passenger.type === "infant"
                ? parseSeat(selectedInfantSeatsReturn[0])
                : parseSeat(selectedSeatsReturn[index]),
            passenger_type: passenger.type,
          })),
        };
        onBookingData(bookingData);

        setIsSaved(true);

        toast.success(`Order data saved.`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const bookingData = {
          flight_id: parseInt(searchParams.get("flightId")),
          payment_method: "snap",
          ordered_by: {
            first_name: orderData.fullName,
            last_name: orderData.lastName || "",
            phone_number: orderData.phoneNumber,
            email: orderData.email,
          },
          passenger: passengers.map((passenger, index) => ({
            first_name: passenger.fullName,
            last_name: passenger.lastName || "",
            dob: dayjs(passenger.dob).toISOString(),
            title: passenger.title.toLowerCase().slice(0, -1),
            nationality: passenger.nationality,
            passenger_type: passenger.type,
            identification_type: passenger.idType.toLowerCase(),
            identification_number: passenger.idNumber,
            identification_country: passenger.issuingCountry || "Indonesia",
            identification_expired: passenger.expiryDate
              ? dayjs(passenger.expiryDate).toISOString()
              : "",
            seat_departure:
              passenger.type === "infant"
                ? parseSeat(selectedInfantSeats[0])
                : parseSeat(selectedSeats[index]),
            passenger_type: passenger.type,
          })),
        };

        onBookingData(bookingData);

        setIsSaved(true);

        toast.success(`Order data saved.`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  const parseSeat = (seatCode) => {
    const row = seatCode.slice(0, -1);
    const column = seatCode.slice(-1);
    return {
      seat_row: column,
      seat_column: row.toUpperCase(),
    };
  };

  const renderSeat = (seat, isDisabled, isReturn = false) => {
    const seatStatuses = isReturn ? seatStatusReturn : seatStatus;
    const isSelected = isReturn
      ? selectedSeatsReturn.includes(seat)
      : selectedSeats.includes(seat);
    let seatStatusClass = "";

    if (seatStatuses && seatStatuses.length > 0) {
      const seatInfo = seatStatuses.find((s) => s.seat_name === seat);
      if (seatInfo) {
        if (seatInfo.seat_status === "available") {
          seatStatusClass = "bg-[#56bf58] text-white font-medium text-sm";
          isDisabled = false;
        } else if (
          seatInfo.seat_status === "locked" ||
          seatInfo.seat_status === "unavailable"
        ) {
          seatStatusClass =
            "bg-[#abadac] text-white font-medium text-sm cursor-not-allowed";
          isDisabled = true;
        }
      }
    }

    const bgColor = isSelected
      ? "bg-customBlue1 text-white font-medium text-sm"
      : seatStatusClass;

    return (
      <button
        key={seat}
        type="button"
        className={`p-2 ${bgColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#447C9D] focus:ring-opacity-75 hover:bg-opacity-75`}
        onClick={() => !isDisabled && handleSeatSelection(seat, isReturn)}
        disabled={isDisabled}
      >
        {seat}
      </button>
    );
  };

  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
          .font-plus-jakarta-sans {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
        `}
      </style>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl  p-6 bg-white rounded-lg shadow-lg border  font-plus-jakarta-sans"
      >
        <h2 className="text-3xl font-bold mb-6 text-customBlue1 border-b-2 border-gray-300 pb-3">
          Fill Order Data
        </h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-customBlue1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={orderData.fullName}
            onChange={handleOrderChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <label className="block text-sm font-medium text-customBlue1">
            Have Family Name?
          </label>
          <Switch
            checked={orderData.hasLastName}
            onChange={() =>
              setOrderData({
                ...orderData,
                hasLastName: !orderData.hasLastName,
              })
            }
            className={`${
              orderData.hasLastName ? "bg-[#447C9D]" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                orderData.hasLastName ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        {orderData.hasLastName && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-customBlue1">
              Family Name
            </label>
            <input
              type="text"
              name="lastName"
              value={orderData.lastName}
              onChange={handleOrderChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
              required
            />
          </div>
        )}
        <div className="mb-6">
          <label className="block text-sm font-medium text-customBlue1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={orderData.phoneNumber}
            onChange={handleOrderChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-customBlue1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={orderData.email}
            onChange={handleOrderChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
            required
          />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-customBlue1 border-b pb-3">
          Passenger Data
        </h2>
        {passengers.map((passenger, index) => (
          <div
            key={index}
            className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-customBlue1">
              Passenger Personal Data {index + 1} - {seoTitle(passenger.type)}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                Title
              </label>
              <select
                name="title"
                value={passenger.title}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
              >
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={passenger.fullName}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="block text-sm font-medium text-customBlue1">
                Have family name?
              </label>
              <Switch
                checked={passenger.hasLastName}
                onChange={() => {
                  const newPassengers = [...passengers];
                  newPassengers[index].hasLastName =
                    !newPassengers[index].hasLastName;
                  setPassengers(newPassengers);
                }}
                className={`${
                  passenger.hasLastName ? "bg-[#447C9D]" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    passenger.hasLastName ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            {passenger.hasLastName && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-customBlue1">
                  Family Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerChange(index, e)}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                Date Of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={passenger.dob}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                Nationality
              </label>
              <select
                name="nationality"
                value={passenger.nationality}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              >
                <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">
                  Bosnia and Herzegovina
                </option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">
                  British Indian Ocean Territory
                </option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">
                  Cocos (Keeling) Islands
                </option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">
                  Congo, The Democratic Republic of The
                </option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">
                  Falkland Islands (Malvinas)
                </option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">
                  French Southern Territories
                </option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">
                  Heard Island and Mcdonald Islands
                </option>
                <option value="Holy See (Vatican City State)">
                  Holy See (Vatican City State)
                </option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">
                  Iran, Islamic Republic of
                </option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">
                  Korea, Democratic People's Republic of
                </option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">
                  Lao People's Democratic Republic
                </option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">
                  Libyan Arab Jamahiriya
                </option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">
                  Macedonia, The Former Yugoslav Republic of
                </option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">
                  Micronesia, Federated States of
                </option>
                <option value="Moldova, Republic of">
                  Moldova, Republic of
                </option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">
                  Netherlands Antilles
                </option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">
                  Northern Mariana Islands
                </option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">
                  Palestinian Territory, Occupied
                </option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">
                  Saint Kitts and Nevis
                </option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">
                  Saint Pierre and Miquelon
                </option>
                <option value="Saint Vincent and The Grenadines">
                  Saint Vincent and The Grenadines
                </option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">
                  Sao Tome and Principe
                </option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">
                  South Georgia and The South Sandwich Islands
                </option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">
                  Svalbard and Jan Mayen
                </option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">
                  Syrian Arab Republic
                </option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">
                  Tanzania, United Republic of
                </option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">
                  Turks and Caicos Islands
                </option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">
                  United States Minor Outlying Islands
                </option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">
                  Virgin Islands, British
                </option>
                <option value="Virgin Islands, U.S.">
                  Virgin Islands, U.S.
                </option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                KTP / Passport
              </label>
              <select
                name="idType"
                value={passenger.idType}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              >
                <option value="ktp">KTP</option>
                <option value="paspor">Paspor</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-customBlue1">
                ID Number
              </label>
              <input
                type="text"
                name="idNumber"
                value={passenger.idNumber}
                onChange={(e) => handlePassengerChange(index, e)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                required
              />
            </div>
            {passenger.idType === "paspor" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-customBlue1">
                    Issuing Country
                  </label>

                  <select
                    name="issuingCountry"
                    value={passenger.issuingCountry}
                    onChange={(e) => handlePassengerChange(index, e)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                    required
                  >
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">
                      Antigua and Barbuda
                    </option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">
                      Bosnia and Herzegovina
                    </option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">
                      British Indian Ocean Territory
                    </option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">
                      Central African Republic
                    </option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">
                      Cocos (Keeling) Islands
                    </option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, The Democratic Republic of The">
                      Congo, The Democratic Republic of The
                    </option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">
                      Dominican Republic
                    </option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">
                      Falkland Islands (Malvinas)
                    </option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">
                      French Southern Territories
                    </option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">
                      Heard Island and Mcdonald Islands
                    </option>
                    <option value="Holy See (Vatican City State)">
                      Holy See (Vatican City State)
                    </option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">
                      Iran, Islamic Republic of
                    </option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="Korea, Republic of">
                      Korea, Republic of
                    </option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">
                      Lao People's Democratic Republic
                    </option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">
                      Libyan Arab Jamahiriya
                    </option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, The Former Yugoslav Republic of">
                      Macedonia, The Former Yugoslav Republic of
                    </option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">
                      Micronesia, Federated States of
                    </option>
                    <option value="Moldova, Republic of">
                      Moldova, Republic of
                    </option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">
                      Netherlands Antilles
                    </option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">
                      Northern Mariana Islands
                    </option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">
                      Palestinian Territory, Occupied
                    </option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">
                      Russian Federation
                    </option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">
                      Saint Kitts and Nevis
                    </option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">
                      Saint Pierre and Miquelon
                    </option>
                    <option value="Saint Vincent and The Grenadines">
                      Saint Vincent and The Grenadines
                    </option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">
                      Sao Tome and Principe
                    </option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">
                      South Georgia and The South Sandwich Islands
                    </option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">
                      Svalbard and Jan Mayen
                    </option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">
                      Syrian Arab Republic
                    </option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">
                      Tanzania, United Republic of
                    </option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">
                      Trinidad and Tobago
                    </option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">
                      Turks and Caicos Islands
                    </option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">
                      United States Minor Outlying Islands
                    </option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands, British">
                      Virgin Islands, British
                    </option>
                    <option value="Virgin Islands, U.S.">
                      Virgin Islands, U.S.
                    </option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-customBlue1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={passenger.expiryDate}
                    onChange={(e) => handlePassengerChange(index, e)}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#447C9D] focus:ring focus:ring-[#447C9D] focus:ring-opacity-50"
                    required
                  />
                </div>
              </>
            )}
          </div>
        ))}

        <h2 className="text-3xl font-bold mb-6 text-customBlue1 border-b pb-3">
          Choose Seat
        </h2>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {filteredSeats.map((section, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold mb-5 text-customBlue1">
                    {section.type}
                  </h3>
                  <div className="grid grid-cols-7 gap-2">
                    {section.rows.map((row, rowIndex) => (
                      <React.Fragment key={rowIndex}>
                        {row.map((seat, seatIndex) =>
                          seat === "" ? (
                            <div key={seatIndex} className="col-span-1">
                              <span className="text-center justify-center"></span>
                            </div>
                          ) : (
                            renderSeat(seat, false)
                          )
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {seatStatusReturn && Object.keys(seatStatusReturn).length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-customBlue1 border-b pb-3">
              Choose Return Seat
            </h2>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  {filteredSeats.map((section, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-xl font-semibold mb-5 text-customBlue1">
                        {section.type}
                      </h3>
                      <div className="grid grid-cols-7 gap-2">
                        {section.rows.map((row, rowIndex) => (
                          <React.Fragment key={rowIndex}>
                            {row.map((seat, seatIndex) =>
                              seat === "" ? (
                                <div key={seatIndex} className="col-span-1">
                                  <span className="text-center justify-center"></span>
                                </div>
                              ) : (
                                renderSeat(seat, false, true)
                              )
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {!isSaved && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-[#164765] text-white rounded-md hover:bg-[#447C9D] focus:outline-none focus:ring-2 focus:ring-[#447C9D] focus:ring-opacity-75 w-full"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;

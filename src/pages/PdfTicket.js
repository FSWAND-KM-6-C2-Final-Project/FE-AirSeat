import React, { Fragment } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

import logo from "../images/logo_airseat.png";
import { seoTitle } from "string-fn";
const dayjs = require("dayjs");

const PdfTicket = ({
  bookingCode,
  created_at,
  ordered_by_first_name,
  ordered_by_last_name,
  ordered_by_phone_number,
  ordered_by_email,
  bookingDetail,
  discount,
  totalAmount,
}) => {
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    titleContainer: { flexDirection: "row", marginTop: 24 },

    logo: { width: 90 },

    reportTitle: { fontSize: 16, textAlign: "center" },

    addressTitle: { fontSize: 11, fontStyle: "bold" },

    invoice: { fontWeight: "bold", fontSize: 20 },

    invoiceNumber: { fontSize: 11, fontWeight: "bold" },

    address: { fontWeight: 400, fontSize: 10 },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 20,
      backgroundColor: "#DEDEDE",
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },

    total: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1.5,
      borderColor: "whitesmoke",
      borderBottomWidth: 1,
    },

    tbody2: { flex: 2, borderRightWidth: 1 },
  });
  const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.reportTitle}>Airseat</Text>
      </View>
    </View>
  );

  const Address = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View>
          <Text style={styles.invoice}>Ticket </Text>
          <Text style={styles.invoiceNumber}>Booking Code: {bookingCode} </Text>
        </View>
      </View>
    </View>
  );

  const UserAddress = () => (
    <View style={styles.titleContainer}>
      <View style={styles.spaceBetween}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.addressTitle}>Ordered By </Text>
          <Text style={styles.address}>
            Name :{`${ordered_by_first_name} `} {ordered_by_last_name}
          </Text>
          <Text style={styles.address}>
            Phone Number :{ordered_by_phone_number}
          </Text>
          <Text style={styles.address}>Email :{ordered_by_email}</Text>
        </View>
        <Text style={styles.addressTitle}>
          Booked At : <br />
          {dayjs(created_at).format("DD MMMM YYYY")}
        </Text>
      </View>
    </View>
  );

  const TableHead = () => (
    <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      <View style={[styles.theader, styles.theader2]}>
        <Text>Passenger Name</Text>
      </View>
      <View style={styles.theader}>
        <Text>Class</Text>
      </View>
      <View style={styles.theader}>
        <Text>Seat</Text>
      </View>
      <View style={styles.theader}>
        <Text>Price</Text>
      </View>
    </View>
  );

  const TableBody = () =>
    bookingDetail.map((booking, index) => (
      <Fragment key={index}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View style={[styles.tbody, styles.tbody2]}>
            <Text>
              {seoTitle(booking.passenger.title) + "."}{" "}
              {booking.passenger.first_name} {booking.passenger.last_name}
            </Text>
          </View>
          <View style={styles.tbody}>
            <Text>{booking.seat.class}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>{booking.seat.seat_name}</Text>
          </View>
          <View style={styles.tbody}>
            <Text>
              {new Intl.NumberFormat("id", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(booking.price)}
            </Text>
          </View>
        </View>
      </Fragment>
    ));

  const TableDiscount = ({ discount, totalAmount }) => {
    let totalOrder = 0;
    bookingDetail.forEach((booking) => {
      totalOrder += parseFloat(booking.price || 0);
    });

    const calculateDiscount = () => {
      if (discount && totalOrder) {
        return (
          parseFloat(totalOrder) * (parseInt(discount.discount_amount) / 100)
        );
      }
      return 0;
    };

    return (
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={styles.total}>
          <Text></Text>
        </View>
        <View style={styles.total}>
          <Text> </Text>
        </View>
        <View style={styles.tbody}>
          <Text>Discount</Text>
        </View>
        <View style={styles.tbody}>
          <Text>
            -
            {new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(parseFloat(calculateDiscount().toFixed(2)))}
          </Text>
        </View>
      </View>
    );
  };

  const TableTotal = () => (
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={styles.total}>
        <Text></Text>
      </View>
      <View style={styles.total}>
        <Text> </Text>
      </View>
      <View style={styles.tbody}>
        <Text>Total</Text>
      </View>
      <View style={styles.tbody}>
        <Text>
          {new Intl.NumberFormat("id", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(parseFloat(totalAmount))}
        </Text>
      </View>
    </View>
  );
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <Address />
        <UserAddress />
        <TableHead />
        <TableBody />
        <TableDiscount discount={discount} totalAmount={totalAmount} />
        <TableTotal />
      </Page>
    </Document>
  );
};
export default PdfTicket;

import React from "react";
import { Text, ScrollView, View, Button } from "react-native";
import styled from "styled-components/native";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import mobileHouseLogo from "../assets/images/mobileHouseLogo";
import Seal from "../assets/images/seal";
import converter from "number-to-words";
import moment from "moment/moment";
import instgramLogo from "../assets/images/instagram";

interface BoxDetailsProps {
  title: string;
  inputType: any;
  name: string;
}

export default function App() {
  let billValues = {
    billNo: "",
    name: "",
    mobile: "",
    phone: "",
    imei1: "",
    imei2: "",
    address: "",
    seal: false,
    total: 0,
  };

  const generatePDF = async () => {
    try {
      const htmlContent = `
     <!DOCTYPE html>
      <html>
      <head> 
        <title>PDF Content</title>
        <style>
         body {
        font-family: Arial, sans-serif;
        padding: 2px;
      }
      .shop-details {
        height: 15%;
        border:1px solid black;
        padding: 3px;
      }
      .customer-details {
        border:1px solid black;
        display: flex;
        flex-direction: column;
        padding:2px;
        margin-top: 2px;
        border-bottom: none;
      }
      .normal-text {
        font-size: 12px;
        margin: 2px 0;
      }
      .bold-text {
        font-size: 12px;
        font-weight: 700;
        margin: 2px 0;
      }
      .row-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .container-center {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    .container-items-left {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }
    .container-items-right {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
      }
      .seal-container {
        height: 62%;
        position: relative;
        border:1px solid black;
        border-top:none
      }
      .total-gst-container {
        height:15%;
        border:1px solid black;
        padding: 3px;
      }
    .dotted-table-border {
            border:1px dotted #E5E4E2;
            text-align: center; 
            font-size:10px;
            font-weight:normal;
            padding: 3px;
            
        }
    .table-border {
            border:1px solid #a7a5a5;
            text-align: center; 
            font-size:10px;
            font-weight:normal;
            padding: 3px;
        }
    .sealStyle {
          position: absolute;
          right: 30px;
          bottom: 10px;
          transform: rotate(-15deg);
          z-index:1;

        }
    .total-row-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid black;
      }
        </style>
      </head>
      <body>
          

        <div style="height:90vh; width: 100%">
          <div class="shop-details">
            <div class="row-container">
              <h5 class="bold-text">GSTIN:32BSGPJ3340H1Z4</h5>
            <div class="container-center">
                <img
                  width="250"
                  height="50"
                  alt="MobileHouseLogo"
                  src="${mobileHouseLogo}"
                />
                <span class="bold-text">3 Way Junction,Peringottukara</span>
                <span class="bold-text">Mob:9072430483</span>
                <div>
                  <img
                  width="30"
                  height="30"
                  alt="instagramLogo"
                  src="${instgramLogo}"
                />
                  <span class="bold-text">mobile.house_</span>
                </div>
              </div>
              <div></div>

            </div>
            <div class="row-container">
              <div class="container-items-left">

                <span  class="bold-text">STATE : KERALA</span>
                <span  class="bold-text">Invoice No : MH- ${
                  billValues.billNo
                }</span>
              </div>
              <span  class="bold-text">GST TAX INVOICE (TYPE - B2C) - CASH SALE</span>
              <div class="container-items-left">

                <span  class="bold-text">STATE CODE : 32</span>
                <span  class="bold-text">Invoice Date : ${moment().format(
                  "LL"
                )}</span>
              </div>
              </div>
              
          </div>
          <div class="customer-details">
                <span  class="bold-text">Customer : ${billValues.name}</span>
                <span  class="normal-text">Address : ${
                  billValues.address
                }</span>
                <span  class="normal-text">Mobile/Tel: ${
                  billValues.mobile
                }</span>
              </div>
          <div>
            <table style="width:100%;border-collapse: collapse;">
              <tr>
                <th class="table-border">Sl No</th>
                <th class="table-border">Name of item/Commodity</th>
                <th class="table-border">HSNCode</th>
                <th class="table-border">Qty</th>
                <th class="table-border">Total Rate</th>
                <th class="table-border">Total Disc</th>
                <th class="table-border">GST%</th>
                <th class="table-border">GST Amt</th>
                <th class="table-border">Total Amount</th>
              </tr>
            <tr>
                <td class="table-border">1</td>
                <td class="table-border">
                <div style="padding:8px">
                  <span class="bold-text" >${billValues.phone}</span></br>
                  <span class="normal-text">IMEI1:${
                    billValues.imei1
                  }</span></br>
                  <span class="normal-text">IMEI2:${billValues.imei2}</span>
                </div>
                </td>
                <td class="table-border"></td>
                <td class="table-border">1</td>
                <td class="table-border">${(
                  billValues.total / +(1 + 18 / 100)
                ).toFixed(2)}</td>
                
                <td class="table-border">0.00</td>
                <td class="table-border">18</td>
                <td class="table-border">${(
                  ((+billValues.total / +(1 + 18 / 100)) * 18) /
                  100
                ).toFixed(2)}</td>
                <td class="table-border">${billValues.total}.00 </td>
                
                </tr>
            </table>
          </div>
          <div class="seal-container">
              <img width="180" height="120" alt="MobileHouseLogo" src="${Seal}" class="sealStyle"/>
          </div>
          <div class="total-gst-container">
                <div class="total-row-container">
                  <span class="boldText">Total</span>
                  <span>1</span>
                  <span>${(billValues.total / +(1 + 18 / 100)).toFixed(
                    2
                  )}</span>
                  <span>${(
                    ((+billValues.total / +(1 + 18 / 100)) * 18) /
                    100
                  ).toFixed(2)}</span>
                  <span>${billValues.total}.00</span>
                </div>
                <div class="row-container">
                    <span><span class="bold-text">In Words:</span><span class="normal-text" >Rupees ${converter.toWords(
                      billValues.total
                    )} only</span> </span>
                      <span class="normal-text">Rounding</span>
                </div>
                <div class="row-container">
                    <table style="border-collapse: collapse">
                      <tr>
                        <th class="dotted-table-border"></th>
                        <th class="dotted-table-border">GST 0%</th>
                        <th class="dotted-table-border">GST 5%</th>
                        <th class="dotted-table-border">GST 12%</th>
                        <th class="dotted-table-border">GST 18%</th>
                        <th class="dotted-table-border">GST 28%</th>
                      </tr>
                      <tr>
                        <td class="dotted-table-border">Taxable</td>
                        <td class="dotted-table-border">000</td>
                        <td class="dotted-table-border">000</td>
                        <td class="dotted-table-border">000</td>
                        <td class="dotted-table-border">${(
                          ((+billValues.total / +(1 + 18 / 100)) * 18) /
                          100
                        ).toFixed(2)}</td>
                        <td class="dotted-table-border">000</td>
                      </tr>
                      <tr>
                        <td class="dotted-table-border">CGST Amount</td>
                        <td class="dotted-table-border">000</td>
                        <td class="dotted-table-border">000</td>
                        <td class="dotted-table-border">000</td>
                        <td class="dotted-table-border">${(
                          (
                            ((+billValues.total / +(1 + 18 / 100)) * 18) /
                            100
                          ).toFixed(2) / 2
                        ).toFixed(2)}</td>
                        <td class="dotted-table-border">000</td>
                      </tr>
                      <tr>
                        <td class="dotted-table-border">SGST Amount</td>
                        <td class="dotted-table-border">000</td>
                        <td class="dotted-table-border">000</td>
                        <td class="dotted-table-border">000</td>
                        <td class="dotted-table-border">${(
                          (
                            ((+billValues.total / +(1 + 18 / 100)) * 18) /
                            100
                          ).toFixed(2) / 2
                        ).toFixed(2)}</td>
                        <td class="dotted-table-border">000</td>
                      </tr>
                    </table>
                    <div class="container-items-right">
                      <span class="bold-text">Total Amount : ${
                        billValues.total
                      }.00</span>
                      <span class="normal-text">Certified that the particulars given above are true and correct:</span>
                      <span class="bold-text">For Mobile House</span>
                      <span class="bold-text">Authorised Signatory</span>

                    </div>
                </div>
          </div>
        </div>
      </body>
    </html>



              `;

      // Generate the PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        height: 810,
        width: 585,
      });

      // Move the PDF to a permanent location
      const pdfUri = `${FileSystem.documentDirectory}${billValues.name}.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: pdfUri,
      });

      // Share the PDF
      await Sharing.shareAsync(pdfUri);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  const handleChange = (name: any, text: any) => {
    billValues = {
      ...billValues,
      [name]: text,
    };
  };
  const BoxDetails = ({ title, inputType, name }: BoxDetailsProps) => {
    return (
      <>
        <Text>{title}</Text>
        <TextBox
          keyboardType={inputType}
          onChangeText={(text) => handleChange(name, text)}
        />
      </>
    );
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <BoxDetails title="Bill No" inputType="numeric" name="billNo" />
      <BoxDetails title="Customer Name" inputType="string" name="name" />
      <BoxDetails title="Mobile Number" inputType="numeric" name="mobile" />
      <BoxDetails title="Phone Model" inputType="string" name="phone" />
      <BoxDetails title="IMEI 1" inputType="numeric" name="imei1" />
      <BoxDetails title="IMEI 2" inputType="numeric" name="imei2" />
      <BoxDetails title="Address" inputType="string" name="address" />
      <BoxDetails title="Total Amount" inputType="numeric" name="total" />
      <Button title="Print Bill" onPress={generatePDF} />
      <View
        style={{
          paddingTop: 2,
          paddingBottom: 40,
        }}
      ></View>
    </ScrollView>
  );
}

const TextBox = styled.TextInput`
  margin-top: 5px;
  margin-bottom: 20px;
  height: 50px;
  padding: 8px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  width: 100%;
`;

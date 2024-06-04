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
          body { font-family: Arial, sans-serif,padding:5px }
          h1 { color: #333; }
          p { font-size: 14px; }
           .container {
            display:flex;
            justify-content: space-between;
            margin-top: -30px;
          }

          .logoContainer  {
            display:flex;
            flex-direction:row;
            padding:3px;
            
          }
          
          h5 {
            font-size:10px;
          }
          .boxBorder {
              padding:5px;
              border:1px solid black;
              border-color:#000000
          }
          .tableStyle {
            padding:2px;
            width:100%;
            border-collapse: collapse;
            border: 1px solid #000000;
          }
            td {   
            text-align: center; 
            border: 1px solid #000000;
            font-size:12px;
        }
        th {   
                    text-align: center; 
                    border: 1px solid #000000;
                     font-size:14px;
          padding: 8px;   
                }
        .divHeight {
          height:390px;
          width:100%;
          position:relative;
        }
        .sealStyle {
          position: absolute;
          right: 30px;
          bottom: 10px;
          transform: rotate(-15deg);
          z-index:1;

        }
        .gstDetails {
          display: flex;
          flex-direction: row;
        }
        .certifiedDiv {
          text-align:end;
          width:50%;
        }
        
        .boldText  {
          font-size: 13px;
          font-weight: bold;
          padding: 0px;
        }


        
        </style>
      </head>
      <body>
        <div class="boxBorder" >
        <div class="logoContainer" >
          <h5 style="width:32%" class="boldText">GSTIN:32BSGPJ3340H1Z4</h5>
          <div style="display: flex;flex-direction:column;align-items: center;">
            <img width="280" height="70"  alt="MobileHouseLogo" src="${mobileHouseLogo}"/></br>
           
          </div>
          <div ></div>
        </div>
        <h5  class="boldText" style="display:flex;flex-direction:column;align-items:center;margin-top:-20px">   
            <span style="margin-left:10px">3 Way Junction,Peringottukara</span></br>
            <span style="margin-top:-10px">Mob:9072430483</span> 
             <div style="display:flex;flex-direction:row;align-items:center;margin-top:-10px">
             <img width="30" height="30"  alt="instagramLogo" src="${instgramLogo}"/>&nbsp;
              <h6>mobile.house_</h6>
          </div>
          </br>
            <div ></div> 
        </h5>
      
        <div class=container style="margin-top:-70px;padding:0px">
          <div style="width:25%">
            <h5 class="boldText">STATE:KERALA</h5>
            <h5 style="margin-top:-17px" class="boldText">Invoice No:${
              billValues.billNo
            }</h5>
          </div>
          <div style="display: flex;flex-direction:column;align-items: center">
            <h5  style="margin-right:30px" class="boldText">GST TAX INVOICE (TYPE - B2C) - CASH SALE</h5>
          </div>
          <div>
            <h5  class="boldText" style="display:flex;flex-direction:column;align-items:flex-end">   
            <span>STATE CODE : 32</span></br>
            <span style="margin-top:-15px">Invoice Date : ${moment().format(
              "LL"
            )}</span>  
        </h5>
      
           
          </div>
            </div>
            </div>
            
            <div style="margin-top:3px" class="boxBorder">
            <h5  style="font-size:12px;font-weight:bold" >Customer :${
              billValues.name
            }</h5>
            <h5 style="margin-top:-10px" >Address:${billValues.address}</h5>
            <h5 style="margin-top:-7px">Mobile Tel : ${billValues.mobile}</h5>
            </div>  
            <table class="tableStyle">
            <tr>
            <th>SLNO</th>
            <th>Name of Item/Commodity</th>
            <th>HSNCode</th>
            <th>Qty</th>
            <th>Total Rate</th>
            <th>Total Disc</th>
            <th>GST%</th>
            <th>GST Amt</th>
            <th>Total Amount</th>
            </tr>
            <tr>
            <td>1</td>
            <td>
            ${billValues.phone}</br></br>
            IMEI1:${billValues.imei1}</br></br>
            IMEI2:${billValues.imei2}</h6>
            </td>
            <td></td>
            <td>1</td>
            <td>${(billValues.total / +(1 + 18 / 100)).toFixed(2)}</td>
            
            <td>0.00</td>
            <td>18</td>
            <td>${(((+billValues.total / +(1 + 18 / 100)) * 18) / 100).toFixed(
              2
            )}</td>
            <td>${billValues.total}.00 </td>
            
            </tr>
            
            </table>
            <div style="border:1px solid black;padding:5px">
            <div class="divHeight">
                          <img width="180" height="120" alt="MobileHouseLogo" src="${Seal}" class="sealStyle"/>

              </div>
        <hr style="width:100%;text-align:left;margin-left:0;color:#000000">
      <div style="display:flex;flex-direction:row;justify-content:space-between;align-items:center;height:15px">
        <h6>Total</h6>
        <h6>1</h6>
        <h6>${(billValues.total / +(1 + 18 / 100)).toFixed(2)}</h6>
        <h6>${(((+billValues.total / +(1 + 18 / 100)) * 18) / 100).toFixed(
          2
        )}</h6>
        <h6>${billValues.total}.00</h6> 
      </div>
        <hr style="width:100%;text-align:left;margin-left:0;color:#000000">
      <div class="gstDetails">
        <div style="width:70%">
          <h5>In Words:${converter.toWords(billValues.total)} only</h5>
          <table style="width:"100%">
          <tr>
            <th></th>
            <th>GST 0%</th>
            <th>GST 5%</th>
            <th>GST 12%</th>
            <th>GST 18%</th>
            <th>GST 28%</th>
          
          </tr>
          <tr>
            <td>Taxable</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td> ${(((+billValues.total / +(1 + 18 / 100)) * 18) / 100).toFixed(
              2
            )}
            <td>0.00</td>
             </td>
          </tr>                
          <tr>
              <td>CGST Amount</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
                 <td>${(
                   (((+billValues.total / +(1 + 18 / 100)) * 18) / 100).toFixed(
                     2
                   ) / 2
                 ).toFixed(2)}</td>
              
              <td>0.00</td>
            </tr>
                      <tr>
              <td>SGST Amount</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>0.00</td>
              <td>${(
                (((+billValues.total / +(1 + 18 / 100)) * 18) / 100).toFixed(
                  2
                ) / 2
              ).toFixed(2)}</td>
              <td>0.00</td>
            </tr>
  
            </table>
                      </div>
                        <div class="certifiedDiv">               
                              <h5 >Rounding:</h5>
                              <h5 style="margin-top:-6px" class="boldText">Total Amount : ${
                                billValues.total
                              }.00</h5>
                              <h5 style="margin-top:-6px">Certified that the particulars given above are true and
            correct:</h5>
                          <h5 style="margin-top:-4px" class="boldText">For MOBILE HOUSE</h5>
                          <h5 style="margin-top:-6px" class="boldText" >Authorised Signatory</h5>
                        </div>
                          </div>
                    </div>
                      

                  </body>
                  </html>
             

              `;

      // Generate the PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Move the PDF to a permanent location
      const pdfUri = `${FileSystem.documentDirectory}example.pdf`;
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
  console.log(billValues);
  return (
    <ScrollView
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
      <Button title="Generate Bill" onPress={generatePDF} />
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

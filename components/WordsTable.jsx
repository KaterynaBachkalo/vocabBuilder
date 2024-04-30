import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Col,
  Cols,
} from "react-native-table-component";

export default class WordsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Words", "Translation", "Progress", ""],
      tableData: [
        ["1", "2", "3", ""],
        ["a", "b", "c", ""],
        ["1", "2", "3", ""],
        ["a", "b", "c", ""],
      ],
      widthArr: [82, 116, 95, 50],
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>...</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <Table
            borderStyle={{
              borderColor: "transparent",
            }}
          >
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
              widthArr={state.widthArr}
            />
            {state.tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData.map((cellData, cellIndex) =>
                  cellIndex === rowData.length - 1
                    ? element(cellData, index)
                    : cellData
                )}
                style={styles.row}
                textStyle={styles.cell}
                widthArr={state.widthArr}
              />
            ))}
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: "rgba(133, 170, 159, 0.1)",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  text: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",

    borderRightColor: "rgb(219, 219, 219)",
    paddingVertical: 16,
    paddingLeft: 14,
    paddingRight: 10,
    color: "rgb(18, 20, 23)",
    flex: 1,
    borderRightWidth: 1,
  },
  cell: {
    fontFamily: "MacPawFixelDisplay_500",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "left",
    borderRightWidth: 1,
    borderRightColor: "rgb(219, 219, 219)",
    paddingVertical: 16,
    paddingLeft: 14,
    paddingRight: 10,
    color: "rgb(18, 20, 23)",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "rgb(252, 252, 252)",
    flexWrap: "wrap",
    borderColor: "rgb(219, 219, 219)",
    borderTopWidth: 1,
    flexWrap: "nowrap",
  },
  btn: {},
  btnText: {
    textAlign: "center",
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 16,
    color: "rgb(18, 20, 23)",
  },
});

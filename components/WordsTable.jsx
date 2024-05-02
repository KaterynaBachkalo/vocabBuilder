import React, { Component, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { vocabBuilderInstance } from "../redux/auth/operations";
import EditDropdown from "./EditDropdown";

export default class WordsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Words", "Translation", "Progress", ""],
      tableData: [["", "", "", ""]],
      widthArr: [82, 116, 95, 50],
      dropdownOpen: Array(1).fill(false),
      fullData: {},
    };
  }

  async componentDidMount() {
    const { data } = await vocabBuilderInstance.get("/words/all");
    // const { data } = await vocabBuilderInstance.get("/words/own");

    const tableData = data.results.map(({ en, ua }) => [en, ua, "", ""]);
    const fullData = data.results;
    this.setState({ tableData });
    this.setState({ fullData });
  }

  _alertIndex(index, id) {
    console.log(id);
    this.setState((prevState) => {
      const dropdownOpen = [...prevState.dropdownOpen];
      dropdownOpen[index] = !dropdownOpen[index];
      console.log(dropdownOpen);
      return { dropdownOpen };
    });
    Alert.alert(`This is row ${index + 1}, id ${id}`);
  }

  _handleOutsidePress() {
    this.setState({
      dropdownOpen: Array(this.state.dropdownOpen.length).fill(false),
    });
  }

  render() {
    const { dropdownOpen } = this.state;
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
              <React.Fragment key={index}>
                <View style={{ position: "relative" }}>
                  <Row
                    key={index}
                    data={rowData.map((cellData, cellIndex) =>
                      cellIndex === rowData.length - 1
                        ? element(cellData, index, state.fullData[index]?._id)
                        : cellData
                    )}
                    style={styles.row}
                    textStyle={styles.cell}
                    widthArr={state.widthArr}
                  />

                  {dropdownOpen[index] &&
                    state.fullData.length !== 0 &&
                    state.fullData.map((dataItem) => (
                      <EditDropdown
                        key={dataItem._id}
                        onClose={() => this._alertIndex(index, dataItem._id)}
                        data={dataItem}
                        id={dataItem._id}
                      />
                    ))}
                </View>
              </React.Fragment>
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

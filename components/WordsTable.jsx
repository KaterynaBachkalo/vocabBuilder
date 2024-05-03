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
import WordsPagination from "./WordsPagination";

export default class WordsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Words", "Translation", "Progress", ""],
      tableData: [["", "", "", ""]],
      widthArr: [82, 116, 95, 50],
      dropdownOpen: Array(1).fill(false),
      fullData: {},
      currentPage: 1,
      totalPages: "",
    };
  }

  componentDidMount() {
    if (this.state.currentPage === 1) {
      this.fetchData(this.state.currentPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevProps.searchWord !== this.props.searchWord
    ) {
      this.fetchData(this.state.currentPage);
    }
  }

  fetchData = async (page) => {
    if (this.props.searchWord) {
      const searchData = this.props.searchWord.map(({ en, ua }) => [
        en,
        ua,
        "",
        "",
      ]);
      // console.log("prop", this.props.searchWord);
      // console.log("searchData", searchData);

      this.setState({ tableData: searchData });

      // console.log(this.state.tableData);
    } else {
      const { data } = await vocabBuilderInstance.get(
        `/words/all?page=${page}`
      );

      const tableData = data.results.map(({ en, ua }) => [en, ua, "", ""]);
      const fullData = data.results;

      this.setState({ tableData });
      this.setState({ fullData });
      this.setState({ totalPages: data.totalPages });
    }
  };

  _alertIndex(index, id) {
    this.setState((prevState) => {
      const dropdownOpen = [...prevState.dropdownOpen];
      dropdownOpen[index] = !dropdownOpen[index];

      return { dropdownOpen };
    });
    Alert.alert(`This is row ${index + 1}, id ${id}`);
  }

  _handleOutsidePress() {
    this.setState({
      dropdownOpen: Array(this.state.dropdownOpen.length).fill(false),
    });
  }

  handleNextPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handlePreviousPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage - 1,
    }));
  };

  handleFirstPage = () => {
    this.setState({
      currentPage: 1,
    });
  };

  handleLastPage = () => {
    this.setState({
      currentPage: this.state.totalPages,
    });
  };

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
      <>
        <View style={{ gap: 32 }}>
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
                      textStyle={{
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
                      }}
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
          <WordsPagination
            currentPage={this.state.currentPage}
            prevPage={this.handlePreviousPage}
            nextPage={this.handleNextPage}
            totalPages={this.state.totalPages}
            firstPage={this.handleFirstPage}
            lastPage={this.handleLastPage}
          />
        </View>
      </>
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

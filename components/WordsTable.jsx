import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import EditDropdown from "./EditDropdown";
import WordsPagination from "./WordsPagination";
import { vocabBuilderInstance } from "../redux/auth/operations";
import IconArrowRight from "../images/icons/arrowRight.svg";
import ModalError from "./ModalError";

export default class WordsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Words", "Translation", this.props.title, ""],
      tableData: [["", "", "", ""]],
      searchData: [["", "", "", ""]],
      fullData: [],
      widthArr: this.props.widthArr,
      dropdownOpen: Array(1).fill(false),
      currentPage: 1,
      totalPages: "",
      id: null,
      selectedRowIndex: null,
      isError: false,
    };
  }

  componentDidMount() {
    if (this.state.currentPage === 1) {
      this.fetchData(this.state.currentPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchData(this.state.currentPage);
    }

    if (prevState.tableData !== this.state.tableData) {
      this.fetchData(this.state.currentPage);
    }

    if (prevProps.searchWord !== this.props.searchWord) {
      this.fetchData(this.state.currentPage);
    }
  }

  componentWillUnmount() {
    this.fetchData(this.state.currentPage);
  }

  fetchData = async (page) => {
    if (this.props.searchWord.length !== 0) {
      const searchData = this.props.searchWord.map(({ en, ua }) => [
        en.toLowerCase(),
        ua.toLowerCase(),
        "",
        "",
      ]);

      this.setState({
        tableData: searchData,
        currentPage: 1,
      });
    } else {
      let result;
      if (this.props.routeName === "DictionaryScreen") {
        const { data } = await vocabBuilderInstance.get(
          `/words/own?page=${page}&limit=7`
        );
        result = data;
      } else {
        const { data } = await vocabBuilderInstance.get(
          `/words/all?page=${page}&limit=7`
        );
        result = data;
      }

      const tableData = result.results.map(({ en, ua }) => [
        en.toLowerCase(),
        ua.toLowerCase(),
        "",
        "",
      ]);
      const fullData = result.results;

      this.setState({
        tableData,
        fullData,
        totalPages: result.totalPages,
      });
    }
  };

  _alertIndex(index, id) {
    this.setState((prevState) => {
      const dropdownOpen = [...prevState.dropdownOpen];
      dropdownOpen[index] = !dropdownOpen[index];

      return { dropdownOpen, selectedRowIndex: index };
    });

    this.setState({ id });
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

  addWordToDictionary = async (_, index, id) => {
    try {
      await vocabBuilderInstance.post(`/words/add/${id}`);
      this.setState({ isError: false });
      alert("You added this word to your list");
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        // this.setState({ isError: true });
        alert("This word is already exist in your list");
      }
      console.log(error.message);
    }
  };

  render() {
    const { dropdownOpen } = this.state;
    const state = this.state;
    const { routeName } = this.props;

    const element = (_, index, id) => (
      <TouchableOpacity onPress={() => this._alertIndex(index, id)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>...</Text>
        </View>
      </TouchableOpacity>
    );

    const arrow = (data, index, id) => (
      <TouchableOpacity
        onPress={() => {
          this.addWordToDictionary(data, index, id);
        }}
        style={styles.btn}
      >
        <IconArrowRight />
      </TouchableOpacity>
    );

    return (
      <>
        <View>
          <ScrollView horizontal={true}>
            <Table
              borderStyle={{
                borderColor: "transparent",
              }}
              style={{ paddingBottom: 65 }}
              widthArr={state.widthArr}
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
                      key={`cell-${index}`}
                      data={rowData.map((cellData, cellIndex) =>
                        cellIndex === rowData.length - 1
                          ? routeName === "DictionaryScreen"
                            ? element(
                                cellData,
                                index,
                                state.fullData[index]?._id
                              )
                            : arrow(cellData, index, state.fullData[index]?._id)
                          : cellData
                      )}
                      style={styles.row}
                      textStyle={styles.cell}
                      widthArr={state.widthArr}
                    />

                    {dropdownOpen[index] &&
                      state.fullData.length !== 0 &&
                      state.fullData.map((dataItem, dataIndex) => (
                        <React.Fragment key={dataItem._id}>
                          {dropdownOpen[index] &&
                            state.selectedRowIndex === dataIndex && ( // Перевірка на відображення для вибраного рядка
                              <EditDropdown
                                key={dataItem._id}
                                onClose={() => {
                                  this._alertIndex(index, dataItem._id);
                                }}
                                data={dataItem}
                                id={dataItem._id}
                              />
                            )}
                        </React.Fragment>
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
          {/* {this.state.isError && (
            <ModalError
              text="Opps, This word is already exist in your list"
              isError={this.state.isError}
            />
          )} */}
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
    borderColor: "rgb(219, 219, 219)",
    borderTopWidth: 1,
    flexWrap: "nowrap",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    color: "rgba(18, 20, 23, 0.5)",
    fontFamily: "MacPawFixelDisplay_600",
    fontSize: 16,
    color: "rgb(18, 20, 23)",
  },
});

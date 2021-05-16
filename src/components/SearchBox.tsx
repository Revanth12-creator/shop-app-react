import { render } from "@testing-library/react";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import SearchAction from "../store/actions/searchAction";
type SearchProps = {
  searchUpdate: (code: string) => void;
};
class SearchBox extends React.Component<SearchProps> {
  render() {
    return (
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e: any) => this.props.searchUpdate(e.target.value)}
        />
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    searchUpdate: (data: string) => dispatch(SearchAction.changeSearch(data)),
  };
};
export default connect(null, mapDispatchToProps)(SearchBox);

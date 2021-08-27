export class BookFilter extends React.Component {
  state = {
    filterBy: {
      title: "",
      maxPrice: 500,
      minPrice: 0,
    },
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value =
      ev.target.type === "number" ? +ev.target.value : ev.target.value;
    this.setState({ filterBy: { ...this.state.filterBy, [field]: value } });
  };

  onFilter = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state.filterBy);
  };

  render() {
    const { title, maxPrice, minPrice } = this.state.filterBy;

    return (
      <section>
        <strong className="filter-header">Filter Books By: </strong>
        <form className="book-filter" onSubmit={this.onFilter}>
          <label htmlFor="by-title">By Title</label>
          <input
            type="text"
            name="title"
            id="by-title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
          />
          <label htmlFor="min-price">Min Price</label>
          <input
            type="number"
            name="minPrice"
            id="min-price"
            placeholder="Min Price"
            value={minPrice}
            onChange={this.handleChange}
          />
          <label htmlFor="max-price">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            id="max-price"
            placeholder="Max Price"
            value={maxPrice}
            onChange={this.handleChange}
          />
          <button>Filter</button>
        </form>
      </section>
    );
  }
}

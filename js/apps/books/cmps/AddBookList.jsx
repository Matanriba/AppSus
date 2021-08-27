export const AddBookList = ({ results, onAddBook }) => {
    return (
      <div className="add-results">
        {!results && 'No Results'}
        {results &&
          results.map((result) => (
            <AddResult key={result.id} result={result} onAddBook={() => onAddBook(result)} />
          ))}
      </div>
    );
  };
  
  export const AddResult = ({ result, onAddBook }) => {
    return (
      <article className="result d-flex align-items-center">
        <div className="result-title py-2">{result.title}</div>
        <button className="result-add btn btn-success p-1" onClick={onAddBook}>
          +
        </button>
      </article>
    );
  };
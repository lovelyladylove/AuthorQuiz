import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Author.css';
import './bootstrap.min.css';

function Hero() {
  return (<div className="row">
    <div className="col-10 offset-1 bg-dark shadow-lg p-3 mb-5 bg-white rounded">
      <h1>AuthorQuiz</h1>
      <p>Select the book written by the author shown</p>
    </div>
  </div>
  );
}

function Book({title, onClick}) {
  return (<div className="answer" onClick={() => {onClick(title)}}>
    <h4>{title}</h4>
  </div>
  );
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong' : 'red'
    };
    return mapping[highlight];
  }


  return (<div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorimage rounded " alt="Author" />
    </div>
    <div className="col-6 shadow-lg p-3 mb-5 bg-white rounded">
      {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
    </div>
  </div>);
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string
}

function Continue({ show, onContinue }) {
  return (
  <div className="row continue">
    { show
      ? <div className="col-11">
        <button className="btn btn-outline-success btn-lg float-right" onClick={onContinue}>Continue</button>
      </div>
    : null }
  </div>
  );
}

function Footer() {
  return (<div id="footer" className="row">
    <div className="breadcrumb col-10 offset-1 bg.dark shadow-lg p-3 mb-5 bg-white rounded">
      <p className="text-muted credit">All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a> and are in the public domain.</p>
    </div>
  </div>);
}

function AuthorQuiz({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue} />
          <p className="col-10 offset-1 "><Link to="/add">Add an Author</Link></p>
        <Footer />
      </div>
    );
  }

export default AuthorQuiz;

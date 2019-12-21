import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import { FaCalendar } from "react-icons/fa/";
import { FaUser } from "react-icons/fa/";
import { FaTag } from "react-icons/fa/";

var slugify = require("slugify");

const Meta = props => {
  const { prefix, author: authorName, category, theme } = props;

  const categoryItem = category.split(",");

  return (
    <p className="meta">
      <span>
        <FaCalendar size={18} /> {prefix}
      </span>
      <span>
        <FaUser size={18} /> {authorName}
      </span>
      {category && (
        <span>
          <FaTag size={18} />
          {categoryItem.map(item => (
            <Link to={`/category/${slugify(item)}`}>{item}&nbsp;</Link>
          ))}
        </span>
      )}

      {/* --- STYLES --- */}
      <style jsx>{`
        .meta {
          display: flex;
          flex-flow: row wrap;
          font-size: 0.8em;
          margin: ${theme.space.m} 0;
          background: transparent;

          :global(svg) {
            fill: ${theme.icon.color};
            margin: ${theme.space.inline.xs};
          }
          span {
            align-items: center;
            display: flex;
            text-transform: uppercase;
            margin: ${theme.space.xs} ${theme.space.s} ${theme.space.xs} 0;
            cursor: pointer;
          }
        }
        @from-width tablet {
          .meta {
            margin: ${`calc(${theme.space.m} * 1.5) 0 ${theme.space.m}`};
          }
        }
      `}</style>
    </p>
  );
};

Meta.propTypes = {
  prefix: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string,
  theme: PropTypes.object.isRequired
};

export default Meta;

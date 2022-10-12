module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('static')
    eleventyConfig.addPassthroughCopy('admin')
    eleventyConfig.addShortcode("excerpt", (article) => extractExcerpt(article));
  
    const striptags = require("striptags");

    const {
      DateTime
    } = require("luxon");

    // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });
  
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
      eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
          zone: 'utc'
        }).toFormat('yy-MM-dd');
      });
  
      eleventyConfig.addFilter("readableDate", dateObj => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat("MM-dd-yy");
    });

    function extractExcerpt(article) {
        if (!article.hasOwnProperty("templateContent")) {
          console.warn(
            'Failed to extract excerpt: Document has no property "templateContent".'
          );
          return null;
        }
      
        let excerpt = null;
        const content = article.templateContent;
      
        excerpt = striptags(content)
          .substring(0, 300) // Cap at 200 characters
          .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
          .trim()
          .concat("...");
        return excerpt;
      }
  };
  
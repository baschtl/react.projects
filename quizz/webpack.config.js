module.exports = {
  "entry": "./index",
  "output": {
    "filename": "bundle.js"
  },
  "mode": "development",
  "module": {
    "rules": [
      {
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "babel-preset-env",
              "babel-preset-react"
            ],
            "plugins": ["transform-object-rest-spread"]
          }
        },
        "exclude": /node_modules/,
        "test": /\.js$/
      },
    ]
  },
  "devServer": {
    "watchFiles": ["public/**/*", "components/**/*", "index.js"]
  }
};

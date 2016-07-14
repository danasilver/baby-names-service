## Baby Names Service

[![Build Status](https://travis-ci.org/danasilver/baby-names-service.svg?branch=master)](https://travis-ci.org/danasilver/baby-names-service)

Run queries on the [baby names](https://github.com/danasilver/baby-names-service/blob/master/data/names1880-2012.csv) dataset.

### API

```
GET /:name/:gender
```

Where `:name` is a name in the dataset and `:gender` is one of `F` or `M`.

Responds with JSON containing ordered data points between the years 1880 and
2012, inclusive. `count` is the number of babies born that year with the
specified name and gender.

```
[
  {
    "name": "Dana",
    "gender": "F",
    "count": "6",
    "year": "1882"
  },
  ...
  {
    "name": "Dana",
    "gender": "F",
    "count": "452",
    "year": "2012"
  }
]
```

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from '../actions'

const Value = ({type, text}) => (
  <div className="flex items-center">
    <div className="mr-2">
      {text}
      </div>
    <div className="text-xs text-teal-400">
      {type}
    </div>
  </div>
)

const BooleanComp = ({value}) => (
  <Value
    type="boolean"
    text={value ? 'true' : 'false'}
  />
)

const NullComp = () => (
  <Value
    type="null"
    text="null"
  />
)

const NumberComp = ({value}) => (
  <Value
    type="number"
    text={value.toString()}
  />
)

const StringComp = ({value}) => (
  <Value
    type="string"
    text={value}
  />
)

const getType = (value) => {
  const s = Object.prototype.toString.apply(value)
  switch (s) {
    case '[object Boolean]':
      return BooleanComp
    case '[object Null]':
      return NullComp
    case '[object String]':
      return StringComp
    case '[object Number]':
      return NumberComp
    case '[object Array]':
      return ArrayComp
    case '[object Object]':
      return ObjectComp
    default:
      throw new Error(`uknown type: ${s}`)
  }
}

const NameValue = ({name, value}) => {
  const ValueType = getType(value)
  return (
    <div className="border border-1 flex mb-1 p-1">
      <div className="text-gray-600 mr-2">
        {name}
      </div>
      <ValueType
        value={value}
      />
    </div>
  )
}

const ArrayComp = ({value}) => (
  <div className="ml-4">
    {value.map((item, i) => {
      return (
        <NameValue
          key={i}
          name={i.toString()}
          value={item}
        />
      )
    })}
  </div>
)


const ObjectComp = ({value}) => (
  <div className="ml-4">
    {Object.keys(value).map((key) => {
      const v = value[key]
      return (
        <NameValue
          key={key}
          name={key}
          value={v}
        />
      )
    })}
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="container mx-auto my-8">
        <NameValue
          name="sunny jimbo"
          value={[
            false,
            true,
            null,
            'hello',
            888,
            [ 'a', 'b', 'c'],
            {
              foo: 'bar',
              baz: null,
              horses: [
                { color: 'green', name: 'old greeny' },
                { color: 'yellow', name: 'Jaund' },
              ],
            },
          ]}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  count: state.count,
})

const mapDispatchToProps = {
  increment,
  decrement,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

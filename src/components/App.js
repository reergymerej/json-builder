import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from '../actions'

const Type = ({text}) => (
  <div className="text-xs text-teal-400">
    {text}
  </div>
)

const ValueType = ({type, value}) => (
  <div className="flex items-center">
    <div className="mr-2">
      {/* <Type text={type} /> */}
      {value}
    </div>
  </div>
)

const BooleanComp = ({value}) => (
  <ValueType
    type="boolean"
    value={value ? 'true' : 'false'}
  />
)

const NullComp = () => (
  <ValueType
    type="null"
    value="null"
  />
)

const NumberComp = ({value}) => (
  <ValueType
    type="number"
    value={value.toString()}
  />
)

const StringComp = ({value}) => (
  <ValueType
    type="string"
    value={value}
  />
)

const getTypeString = (value) => Object.prototype.toString.apply(value)

const getValueTypeComp = (typeString) => {
  switch (typeString) {
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
      throw new Error(`uknown type: ${typeString}`)
  }
}

const wrapPathNode = (node) => {
  return `['${node}']`
}

const appendPath = (path, node) => {
  return `${path}${wrapPathNode(node)}`
}

const NameValue = ({name, value, path}) => {
  const typeString = getTypeString(value)
  const shortTypeString = typeString
    .replace(/\[.+ /, '')
    .replace(/\]/, '')
  const ValueTypeComp = getValueTypeComp(typeString)
  const thisPath = path
    ? appendPath(path, name)
    : name
  return (
    <div className="border border-1 flex mb-1 p-1">
      <div className="text-gray-600 pr-2 mr-2 border-r text-right">
        {name}
        <Type text={shortTypeString} />
      </div>
      <ValueTypeComp
        value={value}
        path={thisPath}
      />
    </div>
  )
}

const ContainerComp = ({type, children}) => (
  <div className="ml-4">
    <ValueType
      type={type}
      value={children}
    />
  </div>
)

const ArrayComp = ({value, path}) => (
  <ContainerComp type="array">
    {value.map((item, i) => (
      <NameValue
        key={i}
        name={i.toString()}
        value={item}
        path={path}
      />
    ))}
  </ContainerComp>
)

const ObjectComp = ({value, path}) => (
  <ContainerComp type="object">
    {Object.keys(value).map((key) => (
      <NameValue
        key={key}
        name={key}
        value={value[key]}
        path={path}
      />
    ))}
  </ContainerComp>
)

const sunnyJimbo = [
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
]

global.sunnyJimbo = sunnyJimbo

class App extends Component {
  render() {
    return (
      <div className="container mx-auto my-8">
        <NameValue
          name="sunnyJimbo"
          value={sunnyJimbo}
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

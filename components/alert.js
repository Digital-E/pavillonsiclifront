import styled from "styled-components";

let Container = styled.div`
  position: fixed;
  display: flex;
  color: black;
  white-space: nowrap;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  background: white;
  border: 1px solid black;
  padding: 15px 20px;

  a {
    color: red;
    margin: 0 5px;
  }
`


export default function Alert({ preview }) {
  return (
    <div>
          {preview ? (
            <Container>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </Container>
          ) : null}
    </div>
  )
}

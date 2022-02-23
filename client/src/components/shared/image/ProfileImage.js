

export default function ProfileImage({height, width, src}) {
  return (
    <img className="rounded-circle m-0 p-0" style={{height: `${height}rem`, width: `${width}rem`}} src={src}/>
  );
}

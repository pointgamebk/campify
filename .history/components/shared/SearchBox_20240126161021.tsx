import { useGoogleMapsScript, Libraries } from "use-google-maps-script";

interface ISearchBoxProps {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
  defaultValue: string;
}

const SearchBox = ({ onSelectAddress, defaultValue }: ISearchBoxProps) => {
  return <div>SearchBox</div>;
};

export default SearchBox;

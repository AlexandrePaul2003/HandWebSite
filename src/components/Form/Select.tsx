import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {IOption} from "../../IData/IOption";


interface IProps {
    name: string;
    isForm: boolean;
    options: IOption[];
    onChange: (option: IOption)=> void;
}

export function Select(props: IProps): JSX.Element {
    return (
        <>
            <div>
                {props.name !== "" && (
                    <label htmlFor="location" className="block text-sm/6 font-medium text-gray-900">
                        {props.name}
                    </label>
                )}
                <div className="mt-2 grid grid-cols-1">
                    <select
                        id="location"
                        name="location"
                        onChange={(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>): void => {
                            const selectedOption: IOption|undefined = props.options.find(
                                (o: IOption): boolean => o.value == event.target.value
                            );
                            props.onChange(selectedOption || props.options[0]);
                        }}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        {props.options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>

                </div>
            </div>
        </>
    );
}
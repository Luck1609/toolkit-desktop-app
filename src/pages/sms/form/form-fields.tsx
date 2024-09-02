import { useState } from "react";

// include the widget CSS file whichever way your bundler supports it
import "react-csv-importer/dist/index.css";
import { Importer, ImporterField } from "react-csv-importer";


import { useFormContext } from "react-hook-form";
import { X, CircleX } from "lucide-react";
import "@/styles.css";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Switch from "@/components/form-components/switch";
import PhoneNumberInput from "@/components/form-components/phone-number-input";
import Textarea from "@/components/form-components/textarea";

export default function CsvParser() {
  const { watch, setValue } = useFormContext(),
    [showImporter, setShowImporter] = useState(false),
    toggleImporter = () => setShowImporter(!showImporter),
    contacts = watch("contacts");

  // useEffect(() => {
  //   reset({
  //     contacts: "",
  //     message: watch("message")
  //   })
  // }, [contacts, reset, watch])

  return (
    <div className="sms-csv max-w-xl w-full bg-default rounded">
      <div className="space-y-4">
        <Switch
          name="imported"
          label="Import contacts"
          placeholder="Import contacts from CSV file"
        />

        {watch("imported") ? (
          <div>
            {Array.isArray(contacts) ? (
              <div className="flex items-center space-x-3">
                <label className="semibold bg-input p-2 rounded px-4">{`${contacts.length} contacts imported`}</label>

                <Button
                  className="p-2 group"
                  onClick={() => setValue("contacts", null)}
                >
                  <CircleX
                    size={20}
                    className="text-danger group-hover:scale-125 trastion-[1s]"
                    style={{ transition: ".3s" }}
                  />
                </Button>
              </div>
            ) : (
              <Button variant="primary" onClick={toggleImporter}>
                Import contact list
              </Button>
            )}
          </div>
        ) : (
          <PhoneNumberInput
            name="contacts"
            label="Receipient(s)"
            className="w-full"
            placeholder="Recipient numbers, (Separate with comma(,))"
          />
        )}

        <div className="">
          <Textarea
            name="message"
            label="Message"
            placeholder="Type in your message"
          />
        </div>
      </div>

      {showImporter && <ImportCSV close={toggleImporter} />}
    </div>
  );
}

const ImportCSV = ({ close }) => {
  const [importedRows, setImportedRows] = useState(null),
    { setValue, watch } = useFormContext(),
    { toast } = useToast();

  return !watch("imported") ? (
    <></>
  ) : (
    <div className="w-full h-full right-0 bottom-0 fixed z-10 bg-red-500 bg-opacity-50 flex justify-center items-center">
      <div className="sms-csv max-w-3xl w-full bg-default p-5 rounded ">
        <div className="flex items-center justify-between border-b border-input">
          <label className="text-slate-300 inline-block mb-2 font-semibold">
            Import CSV
          </label>

          <Button onClick={close}>
            <X size={18} />
          </Button>
        </div>

        <Importer
          dataHandler={async (rows) => {
            /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(rows[0]) ? rows : rows.shift();

            setImportedRows(rows);
            setValue("contacts", rows, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
          }}
          defaultNoHeader={true}
          onComplete={() => {
            toast({
              title: "Import complete",
              description: `${importedRows.length} contacts imported`,
            });

            close();
          }}
        >
          {/* <ImporterField name="lastname" label="Lastname" /> */}
          <ImporterField name="contacts" label="Contacts" />
        </Importer>
      </div>
    </div>
  );
};

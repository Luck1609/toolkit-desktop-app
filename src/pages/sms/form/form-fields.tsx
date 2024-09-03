import { useEffect, useState } from "react";

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
  const { watch, setValue, formState: {errors} } = useFormContext(),
    [showImporter, setShowImporter] = useState(false),
    toggleImporter = () => setShowImporter(!showImporter),
    contacts = watch("contacts"), message = watch('message'), imported = watch('imported');

  useEffect(() => {
    console.log('Import changed')
    setValue('contacts', imported ? [] : '')
  }, [imported])

  console.log('Watch sms form', watch(), 'Errors found =>', errors)

  return (
    <div className="sms-csv w-full dark:bg-default rounded">
      <div className="w-full grid lg:grid-cols-2 gap-5 space-y-4">
        <Switch
          name="imported"
          label="Import contacts"
          placeholder="Import contacts from CSV file"
        />

        {watch("imported") ? (
          <div>
            {Array.isArray(contacts) ? (
              <div className="flex items-center space-x-3 dark:bg-input">
                <label className="semibold p-2 rounded px-4">{`${contacts.length} contacts imported`}</label>

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
            label="Receipient"
            className="w-full"
            placeholder="Recipient's number"
          />
        )}

        <div className="">
          <Textarea
            name="message"
            label="Message"
            placeholder="Type in your message"
          />

          <div className="text-sm text-sky-400">
            Characters typed
            <span className="font-bold ml-1">{message?.length ?? 0}</span>,
            estimated units to be used
            <span className="font-bold ml-1">
              {
                message?.length && message?.length >= 160 ? Math.ceil(message.length / 153) : 1
              }
            </span>
          </div>
        </div>
      </div>

      {showImporter && <ImportCSV close={toggleImporter} />}
    </div>
  );
}

const ImportCSV = ({ close }: {close: () => void}) => {
  const [importedRows, setImportedRows] = useState<string[]>([]),
    { setValue, watch } = useFormContext(),
    { toast } = useToast();

  return !watch("imported") ? (
    <></>
  ) : (
    <div className="w-full h-full right-0 bottom-0 fixed z-10 bg-input bg-opacity-50 flex justify-center items-center">
      <div className="sms-csv max-w-3xl w-full bg-white dark:bg-default p-5 rounded ">
        <div className="flex items-center justify-between dark:border-b dark:border-input pb-2">
          <label className="dark:text-slate-300 inline-block mb-2 font-semibold">
            Import CSV
          </label>

          <Button onClick={close} className="bg-transparent hover:bg-transparent hover:text-danger">
            <X size={18} />
          </Button>
        </div>

        <Importer
          dataHandler={async (rows: Record<string, string>[]) => {
            const contactList = rows.reduce((allContacts: string[], contactDetails: Record<string, string>) => {
              const contact = Object.values(contactDetails)?.[0]
              const isValid = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(contact);
              return isValid
                ? [
                  ...allContacts,
                  contact
                ] : allContacts
            }, [])
              
              console.log('impoted rows =>', contactList)
              setImportedRows(contactList);
              setValue("contacts", contactList, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
          }}
          defaultNoHeader={true}
          onComplete={() => {
            toast({
              status: 'success',
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

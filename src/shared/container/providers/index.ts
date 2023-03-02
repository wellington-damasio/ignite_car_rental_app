import { container } from "tsyringe";
import { DayjsDateProvider } from "./DateProvider/DayjsDateProvider";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { EtherealMailProvider } from "./MailProvider/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
)